const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../middlewares/catchAsync');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Create New Post
exports.newPost = catchAsync(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.post, {
        folder: "instagram/posts",
    });

    const postData = {
        caption: req.body.caption,
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        postedBy: req.user._id
    }

    const post = await Post.create(postData);

    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    res.status(201).json({
        success: true,
        post,
    });
});

// Like or Unlike Post
exports.likeUnlikePost = catchAsync(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    if (post.likes.includes(req.user._id)) {
        const index = post.likes.indexOf(req.user._id);

        post.likes.splice(index, 1);
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post Unliked"
        });
    } else {
        post.likes.push(req.user._id)

        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post Liked"
        });
    }
});

// Delete Post
exports.deletePost = catchAsync(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("Unauthorized", 401));
    }

    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.remove();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);
    await user.save();

    res.status(200).json({
        success: true,
        message: "Post Deleted"
    });
});

// Update Caption
exports.updateCaption = catchAsync(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("Unauthorized", 401));
    }

    post.caption = req.body.caption;

    await post.save();

    res.status(200).json({
        success: true,
        message: "Post Updated"
    });
});

// Add Comment
exports.newComment = catchAsync(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    if (post.comments.includes(req.user._id)) {
        return next(new ErrorHandler("Already Commented", 500));
    }

    post.comments.push({
        user: req.user._id,
        comment: req.body.comment
    });

    await post.save();

    return res.status(200).json({
        success: true,
        message: "Comment Added"
    });
});

// Posts of Following
exports.getPostsOfFollowing = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id)

    const currentPage = Number(req.query.page) || 1;

    const skipPosts = 4 * (currentPage - 1);

    const totalPosts = await Post.find({
        postedBy: {
            $in: user.following
        }
    }).countDocuments();

    const posts = await Post.find({
        postedBy: {
            $in: user.following
        }
    }).populate("postedBy likes").populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).sort({ $natural: -1 }).limit(4).skip(skipPosts)

    return res.status(200).json({
        success: true,
        posts: posts,
        totalPosts
    });
});

// Save or Unsave Post
exports.saveUnsavePost = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id)

    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    if (user.saved.includes(post._id.toString())) {
        user.saved = user.saved.filter((p) => p.toString() !== post._id.toString())
        post.savedBy = post.savedBy.filter((p) => p.toString() !== req.user._id.toString())
        await user.save();
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post Unsaved"
        });
    } else {
        user.saved.push(post._id)
        post.savedBy.push(req.user._id)

        await user.save();
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post Saved"
        });
    }
});

// Get Post Details
exports.getPostDetails = catchAsync(async (req, res, next) => {

    const post = await Post.findById(req.params.id).populate("postedBy likes").populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    res.status(200).json({
        success: true,
        post,
    });
});

// Get All Posts
exports.allPosts = catchAsync(async (req, res, next) => {

    const posts = await Post.find();

    return res.status(200).json({
        posts
    });
});