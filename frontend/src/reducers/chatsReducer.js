import { ALL_CHATS_FAIL, ALL_CHATS_REQUEST, ALL_CHATS_SUCCESS, CLEAR_ERRORS, NEW_CHAT_FAIL, NEW_CHAT_REQUEST, NEW_CHAT_RESET, NEW_CHAT_SUCCESS } from "../constants/chatConstants";

export const allChatsReducer = (state = { chats: [] }, { type, payload }) => {
    switch (type) {
        case ALL_CHATS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_CHATS_SUCCESS:
            return {
                loading: false,
                chats: payload,
            };
        case ALL_CHATS_FAIL:
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

// New Chat Reducer
export const newChatReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                chat: payload.newChat,
            };
        case NEW_CHAT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_CHAT_RESET:
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