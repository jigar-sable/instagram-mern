const express = require('express');
const { newMessage, getMessages } = require('../controllers/messageController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express();

router.route("/newMessage").post(isAuthenticated, newMessage);
router.route("/messages/:chatId").get(isAuthenticated, getMessages);

module.exports = router;