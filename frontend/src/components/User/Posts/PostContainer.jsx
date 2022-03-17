import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors } from '../../../actions/postAction';
import { getUserDetails } from '../../../actions/userAction';
import { DELETE_POST_RESET, LIKE_UNLIKE_POST_RESET, NEW_COMMENT_RESET, SAVE_UNSAVE_POST_RESET } from '../../../constants/postConstants';
import PostItem from './PostItem'

const PostContainer = ({ posts, id }) => {

    const dispatch = useDispatch();
    const params = useParams();

    const { error: likeError, message, success } = useSelector((state) => state.likePost)
    const { error: commentError, success: commentSuccess } = useSelector((state) => state.newComment)
    const { error: saveError, success: saveSuccess, message: saveMessage } = useSelector((state) => state.savePost)
    const { error: deleteError, success: deleteSuccess } = useSelector((state) => state.deletePost)

    useEffect(() => {
        dispatch(getUserDetails(params.username));
        if (likeError) {
            toast.error(likeError);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success(message)
            dispatch({ type: LIKE_UNLIKE_POST_RESET });
        }
        if (commentError) {
            toast.error(commentError);
            dispatch(clearErrors());
        }
        if (commentSuccess) {
            toast.success("Comment Added")
            dispatch({ type: NEW_COMMENT_RESET });
        }
        if (saveError) {
            toast.error(saveError);
            dispatch(clearErrors());
        }
        if (saveSuccess) {
            toast.success(saveMessage)
            dispatch({ type: SAVE_UNSAVE_POST_RESET });
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }
        if (deleteSuccess) {
            toast.success("Post Deleted")
            dispatch({ type: DELETE_POST_RESET });
        }
    }, [dispatch, success, likeError, message, commentError, commentSuccess, saveError, saveSuccess, saveMessage, deleteError, deleteSuccess]);

    return (
        <div className="grid grid-cols-3 gap-1 sm:gap-8 my-1 mb-8" id={id}>
            {posts?.map((post, i) => (
                <PostItem {...post} key={i} />
            )).reverse()
            }
        </div>
    )
}

export default PostContainer