import { useEffect, useRef, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import { commentIcon, emojiIcon, likeIconOutline, saveIconFill, saveIconOutline, shareIcon } from '../../Home/SvgIcons';
import { likeFill } from '../../Navbar/SvgIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, clearErrors, deletePost, likePost, savePost } from '../../../actions/postAction';
import { Picker } from 'emoji-mart';
import { metaballsMenu } from '../SvgIcons';
import moment from 'moment';

const PostItem = ({ _id, caption, likes, comments, image, postedBy, savedBy, createdAt }) => {

    const dispatch = useDispatch();
    const commentInput = useRef(null);

    const [open, setOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [likeEffect, setLikeEffect] = useState(false);

    const { user } = useSelector((state) => state.user);

    const handleLike = () => {
        setLiked(!liked);
        dispatch(likePost(_id));
    }

    const handleComment = (e) => {
        e.preventDefault();
        dispatch(addComment(_id, comment));
        setComment("");
    }

    const handleSave = () => {
        setSaved(!saved);
        dispatch(savePost(_id));
    }

    const handleDeletePost = () => {
        dispatch(deletePost(_id));
        setDeleteModal(false)
    }

    useEffect(() => {
        setLiked(likes.some((id) => id === user._id))
    }, [likes]);

    useEffect(() => {
        setSaved(savedBy.some((id) => id === user._id))
    }, [savedBy]);

    const closeDeleteModal = () => {
        setDeleteModal(false)
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

    return (
        <>
            <div onClick={() => setOpen(true)} className="group w-full h-32 sm:h-72 max-h-72 flex justify-center items-center bg-black cursor-pointer relative z-0">
                <img draggable="false" loading="lazy" className="hover:opacity-75 group-hover:opacity-75 cursor-pointer object-cover h-full w-full" src={image.url} alt="Post" />
                <div className="hidden group-hover:flex text-white absolute pointer-events-none gap-4">
                    <span><FavoriteIcon /> {likes.length}</span>
                    <span><ModeCommentIcon /> {comments.length}</span>
                </div>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth='xl'>
                <div className="flex sm:flex-row flex-col max-w-7xl">

                    <div className="relative flex items-center justify-center bg-black sm:h-[90vh] w-full" onDoubleClick={setLike}>
                        <img draggable="false" className="object-contain h-full w-full" src={image.url} alt="post" />
                        {likeEffect &&
                            <img draggable="false" height="80px" className="likeEffect" alt="heart" src="https://img.icons8.com/ios-filled/2x/ffffff/like.png" />
                        }
                    </div>

                    <div className="flex flex-col justify-between border w-full max-w-xl rounded bg-white">

                        {/* id with menu icon */}
                        <div className="flex justify-between px-3 py-2 border-b items-center">
                            {/* icon with name */}
                            <div className="flex space-x-3 items-center">
                                <Link to={`/${postedBy.username}`}><img draggable="false" className="w-10 h-10 rounded-full object-cover" src={postedBy.avatar.url} alt="avatar" /></Link>
                                <Link to={`/${postedBy.username}`} className="text-black text-sm font-semibold hover:underline">{postedBy.username}</Link>
                            </div>
                            <span onClick={() => setDeleteModal(true)} className="cursor-pointer">{metaballsMenu}</span>
                        </div>

                        <Dialog open={deleteModal} onClose={closeDeleteModal} maxWidth='xl'>
                            <div className="flex flex-col items-center w-80">
                                {postedBy._id === user._id &&
                                    <button onClick={handleDeletePost} className="text-red-600 font-medium border-b py-2.5 w-full hover:bg-red-50">Delete</button>
                                }
                                <button onClick={closeDeleteModal} className="py-2.5 w-full hover:bg-gray-50">Cancel</button>
                            </div>
                        </Dialog>

                        {/* comments */}
                        <div className="p-4 w-full flex-1 max-h-[63vh] overscroll-x-hidden overflow-y-auto">

                            <div className="flex items-start">
                                <Link to={`/${postedBy.username}`} className="w-12"><img draggable="false" className="w-9 h-9 rounded-full object-cover" src={postedBy.avatar.url} alt="avatar" /></Link>
                                <Link to={`/${postedBy.username}`} className="text-sm font-semibold hover:underline">{postedBy.username}</Link>
                            </div>
                            <p className="text-sm whitespace-pre-line ml-12 -mt-4 mb-3.5">{caption}</p>

                            {comments.map((c) => (
                                <div className="flex items-start space-x-1 mb-3" key={c._id}>
                                    <Link to={`/${c.user}`}><img draggable="false" className="w-9 h-9 rounded-full object-cover mr-2.5" src={c.user.avatar.url} alt="avatar" /></Link>
                                    <Link to={`/${c.user}`} className="text-sm font-semibold hover:underline">{c.user.username}</Link>
                                    <p className="text-sm whitespace-pre-line">{c.comment}</p>
                                </div>
                            ))}
                        </div>

                        <div className="">
                            {/* like comment container */}
                            <div className="flex flex-col px-3 space-y-1 border-b border-t pb-2">
                                {/* icons container */}
                                <div className="flex items-center justify-between py-2">
                                    {/* left icons container */}
                                    <div className="flex space-x-4">
                                        <button onClick={handleLike}>{liked ? likeFill : likeIconOutline}</button>
                                        <button onClick={() => commentInput.current.focus()}>{commentIcon}</button>
                                        {shareIcon}
                                    </div>
                                    <button onClick={handleSave}>{saved ? saveIconFill : saveIconOutline}</button>
                                </div>

                                {/* likes  */}
                                <span className="w-full font-semibold text-sm">{likes.length} likes</span>

                                {/* time */}
                                <span className="text-xs text-gray-500">{moment(createdAt).fromNow()}</span>
                            </div>

                            {/* comment input */}
                            <form onSubmit={handleComment} className="flex items-center justify-between p-3 w-full space-x-3 relative">
                                <span onClick={() => setShowEmojis(!showEmojis)} className="cursor-pointer">{emojiIcon}</span>

                                {showEmojis && (
                                    <div className="absolute bottom-12 -left-20">
                                        <Picker
                                            set="google"
                                            onSelect={(e) => setComment(comment + e.native)}
                                            title="Emojis"
                                        />
                                    </div>
                                )}

                                <input
                                    className="flex-auto text-sm outline-none border-none bg-transparent"
                                    type="text"
                                    value={comment}
                                    ref={commentInput}
                                    required
                                    onClick={() => setShowEmojis(false)}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add a comment..." />
                                <button type="submit" className={`${comment.trim().length < 1 ? 'text-blue-300' : 'text-primary-blue'} text-sm font-semibold`} disabled={comment.trim().length < 1}>Post</button>
                            </form>
                        </div>

                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default PostItem