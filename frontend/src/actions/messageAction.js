import axios from "axios";
import { ALL_MESSAGES_FAIL, ALL_MESSAGES_REQUEST, ALL_MESSAGES_SUCCESS, CLEAR_ERRORS, NEW_MESSAGE_FAIL, NEW_MESSAGE_REQUEST, NEW_MESSAGE_SUCCESS } from "../constants/messageConstants";

// Get All Messages
export const getAllMessages = (chatId) => async (dispatch) => {
    try {

        dispatch({ type: ALL_MESSAGES_REQUEST });

        const { data } = await axios.get(`/api/v1/messages/${chatId}`);

        dispatch({
            type: ALL_MESSAGES_SUCCESS,
            payload: data.messages,
        });

    } catch (error) {
        dispatch({
            type: ALL_MESSAGES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New Message
export const sendMessage = (msgData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_MESSAGE_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post('/api/v1/newMessage/', msgData, config);

        dispatch({
            type: NEW_MESSAGE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: NEW_MESSAGE_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}