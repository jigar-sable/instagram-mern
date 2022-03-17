const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
        content: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);