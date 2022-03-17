import { CLEAR_ERRORS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_RESET, DELETE_POST_SUCCESS, LIKE_UNLIKE_POST_FAIL, LIKE_UNLIKE_POST_REQUEST, LIKE_UNLIKE_POST_RESET, LIKE_UNLIKE_POST_SUCCESS, NEW_COMMENT_FAIL, NEW_COMMENT_REQUEST, NEW_COMMENT_RESET, NEW_COMMENT_SUCCESS, NEW_POST_FAIL, NEW_POST_REQUEST, NEW_POST_RESET, NEW_POST_SUCCESS, POST_DETAILS_FAIL, POST_DETAILS_REQUEST, POST_DETAILS_RESET, POST_DETAILS_SUCCESS, POST_FOLLOWING_FAIL, POST_FOLLOWING_REQUEST, POST_FOLLOWING_RESET, POST_FOLLOWING_SUCCESS, SAVE_UNSAVE_POST_FAIL, SAVE_UNSAVE_POST_REQUEST, SAVE_UNSAVE_POST_RESET, SAVE_UNSAVE_POST_SUCCESS } from "../constants/postConstants";


// New Post Reducer
export const newPostReducer = (state = { post: {} }, { type, payload }) => {
    switch (type) {
        case NEW_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_POST_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                post: payload.post,
            };
        case NEW_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_POST_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}


export const postOfFollowingReducer = (state = { posts: [] }, { type, payload }) => {
    switch (type) {
        case POST_FOLLOWING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case POST_FOLLOWING_SUCCESS:
            return {
                loading: false,
                posts: [...state.posts, ...payload.posts],
                totalPosts: payload.totalPosts,
            };
        case POST_FOLLOWING_RESET:
            return {
                ...state,
                posts: [],
                totalPosts: 0,
            };
        case POST_FOLLOWING_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const likePostReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case LIKE_UNLIKE_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LIKE_UNLIKE_POST_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                message: payload.message,
            };
        case LIKE_UNLIKE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case LIKE_UNLIKE_POST_RESET:
            return {
                ...state,
                success: false,
                message: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const newCommentReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_COMMENT_SUCCESS:
            return {
                loading: false,
                success: payload,
            };
        case NEW_COMMENT_RESET:
            return {
                ...state,
                success: false,
            };
        case NEW_COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const savePostReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case SAVE_UNSAVE_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SAVE_UNSAVE_POST_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                message: payload.message,
            };
        case SAVE_UNSAVE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SAVE_UNSAVE_POST_RESET:
            return {
                ...state,
                success: false,
                message: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const deletePostReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_POST_SUCCESS:
            return {
                loading: false,
                success: payload,
            };
        case DELETE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case DELETE_POST_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const postDetailsReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case POST_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case POST_DETAILS_SUCCESS:
            return {
                loading: false,
                post: payload.post,
            };
        case POST_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case POST_DETAILS_RESET:
            return {
                loading: false,
                post: {}
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}