import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment, likePost, savePost } from '../../actions/postAction';
import { likeFill } from '../Navbar/SvgIcons';
import { commentIcon, emojiIcon, likeIconOutline, moreIcons, saveIconFill, saveIconOutline, shareIcon } from './SvgIcons'
import { Picker } from 'emoji-mart'
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';
import moment from 'moment';

const PostItem = ({ _id, caption, likes, comments, image, postedBy, savedBy, createdAt, setUsersDialog, setUsersList }) => {

    const dispatch = useDispatch();
    const commentInput = useRef(null);

    const { user } = useSelector((state) => state.user);
    const { loading: likeLoading } = useSelector((state) => state.likePost);
    const { loading: commentLoading } = useSelector((state) => state.newComment);
    const { loading: saveLoading } = useSelector((state) => state.savePost);

    const [allLikes, setAllLikes] = useState(likes);
    const [allComments, setAllComments] = useState(comments);
    const [allSavedBy, setAllSavedBy] = useState(savedBy);

    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [viewComment, setViewComment] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);

    const [likeEffect, setLikeEffect] = useState(false);

    const handleLike = async () => {
        setLiked(!liked);
        await dispatch(likePost(_id));
        const { data } = await axios.get(`/api/v1/post/detail/${_id}`)
        setAllLikes(data.post.likes)
    }

    const handleComment = async (e) => {
        e.preventDefault();
        await dispatch(addComment(_id, comment));
        setComment("");
        const { data } = await axios.get(`/api/v1/post/detail/${_id}`)
        setAllComments(data.post.comments)
    }

    const handleSave = async () => {
        setSaved(!saved);
        await dispatch(savePost(_id));
        const { data } = await axios.get(`/api/v1/post/detail/${_id}`)
        setAllSavedBy(data.post.savedBy)
    }

    const handleLikeModal = () => {
        setUsersDialog(true);
        setUsersList(allLikes);
    }

    const setLike = () => {
        setLikeEffect(true)
        setTimeout(() => {
            setLikeEffect(false)
        }, 500)
        if (liked) {
            return;
        }
        handleLike();
    }

    useEffect(() => {
        setLiked(allLikes.some((u) => u._id === user._id))
    }, [allLikes]);

    useEffect(() => {
        setSaved(allSavedBy.some((id) => id === user._id))
    }, [allSavedBy]);


    return (
        <div className="flex flex-col border rounded bg-white relative" role="article" aria-label={`Post by ${postedBy.username}`}>

            <div className="flex justify-between px-3 py-2.5 border-b items-center">
                <div className="flex space-x-3 items-center">
                    <Link to={`/${postedBy.username}`}><img draggable="false" className="w-10 h-10 rounded-full object-cover" src={postedBy.avatar} alt={`${postedBy.username}'s profile picture`} /></Link>
                    <Link to={`/${postedBy.username}`} className="text-black text-sm font-semibold">{postedBy.username}</Link>
                </div>
                <button 
                    aria-label="More options" 
                    className="cursor-pointer"
                >
                    {moreIcons}
                </button>
            </div>

            {/* post image container */}
            <div 
                className="relative flex items-center justify-center" 
                onDoubleClick={setLike}
                aria-label="Double click to like"
                role="img"
                tabIndex="0"
            >
                <img 
                    draggable="false" 
                    loading="lazy" 
                    className="w-full h-full object-cover object-center" 
                    src={image} 
                    alt={caption || "Post image"} 
                />
                {likeEffect &&
                    <img 
                        draggable="false" 
                        height="80px" 
                        className="likeEffect" 
                        alt="Heart animation" 
                        src="https://img.icons8.com/ios-filled/2x/ffffff/like.png" 
                    />
                }
            </div>

            {/* like comment container */}
            <div className="flex flex-col px-4 space-y-1 border-b pb-2 mt-2">

                {/* icons container */}
                <div className="flex items-center justify-between py-2">
                    <div className="flex space-x-4">
                        <button 
                            onClick={handleLike} 
                            disabled={likeLoading}
                            aria-label={liked ? "Unlike post" : "Like post"}
                            aria-pressed={liked}
                        >
                            {likeLoading ? (
                                <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin" aria-label="Loading"></div>
                            ) : (
                                liked ? likeFill : likeIconOutline
                            )}
                        </button>
                        <button 
                            onClick={() => commentInput.current.focus()}
                            aria-label="Add a comment"
                        >
                            {commentIcon}
                        </button>
                        <button aria-label="Share post">
                            {shareIcon}
                        </button>
                    </div>
                    <button 
                        onClick={handleSave} 
                        disabled={saveLoading}
                        aria-label={saved ? "Unsave post" : "Save post"}
                        aria-pressed={saved}
                    >
                        {saveLoading ? (
                            <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin" aria-label="Loading"></div>
                        ) : (
                            saved ? saveIconFill : saveIconOutline
                        )}
                    </button>
                </div>

                {/* likes  */}
                <button 
                    onClick={handleLikeModal} 
                    className="font-semibold text-sm cursor-pointer text-left"
                    aria-label={`View ${allLikes.length} likes`}
                >
                    {allLikes.length} {allLikes.length === 1 ? 'like' : 'likes'}
                </button>

                {/* comment */}
                <div className="flex flex-auto items-center space-x-1">
                    <Link to={`/${postedBy.username}`} className="text-sm font-semibold hover:underline">{postedBy.username}</Link>
                    <span className="text-sm truncate">{caption}</span>
                </div>

                {/* time */}
                {allComments.length > 0 ?

                    <button 
                        onClick={() => setViewComment(!viewComment)} 
                        className="text-[13px] text-gray-500 cursor-pointer text-left"
                        aria-expanded={viewComment}
                        aria-label={viewComment ? "Hide comments" : `View all ${allComments.length} comments`}
                    >
                        {viewComment ? "Hide Comments" :
                            allComments.length === 1 ?
                                `View ${allComments.length} Comment` :
                                `View All ${allComments.length} Comments`
                        }
                    </button> :

                    <span className="text-[13px] text-gray-500">No Comments Yet!</span>

                }
                <time className="text-xs text-gray-500" dateTime={createdAt}>
                    {moment(createdAt).fromNow()}
                </time>

                {viewComment &&
                    <ScrollToBottom className="w-full h-52 overflow-y-auto py-1">
                        {allComments.map((c) => (
                            <div className="flex items-start mb-2 space-x-2" key={c._id}>
                                <img draggable="false" className="h-7 w-7 rounded-full object-cover mr-0.5" src={c.user.avatar} alt={`${c.user.username}'s profile picture`} />
                                <Link to={`/${c.user}`} className="text-sm font-semibold hover:underline">{c.user.username}</Link>
                                <p className="text-sm">{c.comment}</p>
                            </div>
                        ))}
                    </ScrollToBottom>
                }

            </div>

            {/* comment input container */}
            <form onSubmit={handleComment} className="flex items-center justify-between p-3 w-full space-x-3">
                <button 
                    type="button"
                    onClick={() => setShowEmojis(!showEmojis)} 
                    className="cursor-pointer"
                    aria-label={showEmojis ? "Close emoji picker" : "Open emoji picker"}
                    aria-expanded={showEmojis}
                >
                    {emojiIcon}
                </button>

                {showEmojis && (
                    <div className="absolute bottom-12 -left-2">
                        <Picker
                            set="google"
                            onSelect={(e) => setComment(comment + e.native)}
                            title="Emojis"
                            aria-label="Emoji picker"
                        />
                    </div>
                )}

                <input
                    className="flex-auto text-sm outline-none border-none bg-transparent"
                    type="text"
                    value={comment}
                    ref={commentInput}
                    required
                    onFocus={() => setShowEmojis(false)}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..." 
                    aria-label="Write a comment"
                />
                <button 
                    type="submit" 
                    className={`${comment.trim().length < 1 ? 'text-blue-300' : 'text-primary-blue'} text-sm font-semibold flex items-center`}
                    disabled={comment.trim().length < 1 || commentLoading}
                    aria-label="Post comment"
                >
                    {commentLoading ? (
                        <div className="w-4 h-4 border-t-2 border-blue-500 rounded-full animate-spin mr-1" aria-label="Loading"></div>
                    ) : null}
                    Post
                </button>
            </form>

        </div >
    )
}

export default PostItem