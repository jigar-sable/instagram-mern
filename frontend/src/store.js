import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allUsersReducer, followUserReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { deletePostReducer, likePostReducer, newCommentReducer, newPostReducer, postDetailsReducer, postOfFollowingReducer, savePostReducer } from './reducers/postReducer';
import { allChatsReducer, newChatReducer } from './reducers/chatsReducer';
import { allMessagesReducer, newMessageReducer } from './reducers/messageReducer';

const reducer = combineReducers({
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    newPost: newPostReducer,
    userDetails: userDetailsReducer,
    allUsers: allUsersReducer,
    postOfFollowing: postOfFollowingReducer,
    likePost: likePostReducer,
    followUser: followUserReducer,
    newComment: newCommentReducer,
    savePost: savePostReducer,
    deletePost: deletePostReducer,
    profile: profileReducer,
    postDetails: postDetailsReducer,
    allChats: allChatsReducer,
    allMessages: allMessagesReducer,
    newMessage: newMessageReducer,
    newChat: newChatReducer,
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;