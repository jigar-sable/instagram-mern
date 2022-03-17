const express = require('express');
const { newPost, likeUnlikePost, deletePost, newComment, allPosts, getPostsOfFollowing, updateCaption, saveUnsavePost, getPostDetails } = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express();

router.route("/post/new").post(isAuthenticated, newPost);

router.route("/posts/all").get(allPosts);

router.route("/posts").get(isAuthenticated, getPostsOfFollowing);

router.route("/post/detail/:id").get(isAuthenticated, getPostDetails);

router.route("/post/:id")
    .get(isAuthenticated, likeUnlikePost)
    .post(isAuthenticated, saveUnsavePost)
    .put(isAuthenticated, updateCaption)
    .delete(isAuthenticated, deletePost);

router.route("/post/comment/:id").post(isAuthenticated, newComment)

module.exports = router;