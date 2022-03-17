const express = require('express');
const { newPost, likeUnlikePost, deletePost, newComment, allPosts, getPostsOfFollowing, updateCaption, saveUnsavePost, getPostDetails } = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/auth');
const path = require('path');
const multer = require('multer');

const router = express();

const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/uploads/posts'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const postUpload = multer({
    storage: postStorage,
    limit: { fileSize: 1000000 * 10 }
});

router.route("/post/new").post(isAuthenticated, postUpload.single('post'), newPost);

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