const express = require('express');
const { loginUser, signupUser, logoutUser, followUser, updateProfile, updatePassword, forgotPassword, resetPassword, getUserDetails, getAccountDetails, getAllUsers, searchUsers, getUserDetailsById, deleteProfile } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');
const { uploadAvatar } = require('../utils/awsFunctions');

const router = express();

router.route("/signup").post(uploadAvatar.single('avatar'), signupUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/me")
    .get(isAuthenticated, getAccountDetails)
    .delete(isAuthenticated, deleteProfile);

router.route("/user/:username").get(isAuthenticated, getUserDetails);
router.route("/userdetails/:id").get(isAuthenticated, getUserDetailsById);

router.route("/users/suggested").get(isAuthenticated, getAllUsers);
router.route("/users").get(isAuthenticated, searchUsers);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/profile").put(isAuthenticated, uploadAvatar.single('avatar'), updateProfile);
router.route("/update/password").put(isAuthenticated, updatePassword);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

module.exports = router;