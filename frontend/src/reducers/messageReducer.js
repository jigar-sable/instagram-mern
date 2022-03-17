import { ALL_MESSAGES_ADD, ALL_MESSAGES_FAIL, ALL_MESSAGES_REQUEST, ALL_MESSAGES_SUCCESS, CLEAR_ERRORS, NEW_MESSAGE_FAIL, NEW_MESSAGE_REQUEST, NEW_MESSAGE_RESET, NEW_MESSAGE_SUCCESS } from "../constants/messageConstants";

export const allMessagesReducer = (state = { messages: [] }, { type, payload }) => {
    switch (type) {
        case ALL_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_MESSAGES_SUCCESS:
            return {
                loading: false,
                messages: payload,
            };
        case ALL_MESSAGES_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case ALL_MESSAGES_ADD:
            return {
                ...state,
                messages: [...state.messages, payload]
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

export const newMessageReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_MESSAGE_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                newMessage: payload.newMessage,
            };
        case NEW_MESSAGE_RESET:
            return {
                ...state,
                success: false,
                newMessage: {}
            };
        case NEW_MESSAGE_FAIL:
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