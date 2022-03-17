const User = require('../models/userModel');
const Post = require('../models/postModel');
const catchAsync = require('../middlewares/catchAsync');
const sendCookie = require('../utils/sendCookie');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Signup User
exports.signupUser = catchAsync(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "instagram/avatars",
        width: 150,
        crop: "scale",
    });

    const { name, email, username, password } = req.body;

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (user) {
        if (user.username === username) {
            return next(new ErrorHandler("Username already exists", 401));
        }
        return next(new ErrorHandler("Email already exists", 401));
    }

    const newUser = await User.create({
        name,
        email,
        username,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    })

    sendCookie(newUser, 201, res);
});

// Login User
exports.loginUser = catchAsync(async (req, res, next) => {

    const { userId, password } = req.body;

    const user = await User.findOne({
        $or: [{ email: userId }, { username: userId }]
    }).select("+password");

    if (!user) {
        return next(new ErrorHandler("User doesn't exist", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Password doesn't match", 401));
    }

    sendCookie(user, 201, res);
});

// Logout User
exports.logoutUser = catchAsync(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get User Details --Logged In User
exports.getAccountDetails = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id).populate({
        path: 'posts',
        populate: {
            path: 'postedBy'
        }
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// Get User Details
exports.getUserDetails = catchAsync(async (req, res, next) => {

    const user = await User.findOne({ username: req.params.username }).populate("followers following").populate({
        path: 'posts',
        populate: {
            path: 'comments',
            populate: {
                path: 'user'
            }
        },
    }).populate({
        path: 'posts',
        populate: {
            path: 'postedBy'
        }
    }).populate({
        path: 'saved',
        populate: {
            path: 'comments',
            populate: {
                path: 'user'
            }
        },
    }).populate({
        path: 'saved',
        populate: {
            path: 'postedBy'
        }
    })

    res.status(200).json({
        success: true,
        user,
    });
});

// Get User Details By Id
exports.getUserDetailsById = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    res.status(200).json({
        success: true,
        user,
    });
});

// Get All Users
exports.getAllUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    const suggestedUsers = users.filter((u) => !u.followers.includes(req.user._id) && u._id.toString() !== req.user._id.toString()).slice(0, 5).reverse()

    res.status(200).json({
        success: true,
        users: suggestedUsers,
    });
});

// Update Password
exports.updatePassword = catchAsync(async (req, res, next) => {

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Old Password", 401));
    }

    user.password = newPassword;
    await user.save();
    sendCookie(user, 201, res);
});

// Update Profile
exports.updateProfile = catchAsync(async (req, res, next) => {

    const { name, username, website, bio, email } = req.body;

    const newUserData = {
        name,
        username,
        website,
        bio,
        email,
    }

    const userExists = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (userExists && userExists._id.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("User Already Exists", 404));
    }

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user._id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "instagram/avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }

    await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete Profile ⚠️⚠️
exports.deleteProfile = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    // delete post & user images ⚠️⚠️

    await user.remove();

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    for (let i = 0; i < posts.length; i++) {
        const post = await Post.findById(posts[i]);
        await post.remove();
    }

    for (let i = 0; i < followers.length; i++) {
        const follower = await User.findById(followers[i]);

        const index = follower.following.indexOf(userId);
        follower.following.splice(index, 1);
        await follower.save();
    }

    for (let i = 0; i < following.length; i++) {
        const follows = await User.findById(following[i]);

        const index = follows.followers.indexOf(userId);
        follows.followers.splice(index, 1);
        await follows.save();
    }

    res.status(200).json({
        success: true,
        message: "Profile Deleted"
    });
});

// Follow | Unfollow User
exports.followUser = catchAsync(async (req, res, next) => {

    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    if (loggedInUser.following.includes(userToFollow._id)) {

        const followingIndex = loggedInUser.following.indexOf(userToFollow._id);
        const followerIndex = userToFollow.followers.indexOf(loggedInUser._id);

        loggedInUser.following.splice(followingIndex, 1);
        userToFollow.followers.splice(followerIndex, 1);

        await loggedInUser.save();
        await userToFollow.save();

        return res.status(200).json({
            success: true,
            message: "User Unfollowed"
        });
    } else {
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
        await loggedInUser.save();
        await userToFollow.save();

        res.status(200).json({
            success: true,
            message: "User Followed",
        });
    }
});

// Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    const resetPasswordToken = await user.getResetPasswordToken()

    await user.save();

    const resetPasswordUrl = `https://${req.get("host")}/password/reset/${resetPasswordToken}`;

    try {
        await sendEmail({
            email: user.email,
            templateId: process.env.SENDGRID_RESET_TEMPLATEID,
            data: {
                reset_url: resetPasswordUrl
            }
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendCookie(user, 200, res);
});

// User Search
exports.searchUsers = catchAsync(async (req, res, next) => {

    if (req.query.keyword) {
        const users = await User.find({
            $or: [
                {
                    name: {
                        $regex: req.query.keyword,
                        $options: "i",
                    },
                },
                {
                    username: {
                        $regex: req.query.keyword,
                        $options: "i",
                    }
                }
            ]
        });

        res.status(200).json({
            success: true,
            users,
        });
    }
});

// User Search -- Atlas Search
// exports.searchUsers = catchAsync(async (req, res, next) => {

//     if (req.query.keyword) {
//         const users = await User.aggregate(
//             [
//                 {
//                     $search: {
//                         index: 'usersearch',
//                         text: {
//                             query: req.query.keyword,
//                             path: ['name', 'username'],
//                             fuzzy: {
//                                 maxEdits: 2.0
//                             }
//                         }
//                     }
//                 }
//             ]
//         )

//         res.status(200).json({
//             success: true,
//             users,
//         });
//     }
// });