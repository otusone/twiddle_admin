const express = require('express');
const router = express.Router();

const authController = require('../controllers/userAuth');
const {otpRateLimiter} = require('../middlewares/otpRateLimiter');
const parseJsonArrays = require('../middlewares/parseJsonArrays');
const {userAuth}=require("../middlewares/auth")

const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/signup/send-otp', otpRateLimiter, authController.sendOtp);
router.post('/signup/verify-otp', authController.verifyOtp);

router.post('/login-otp', authController.sendLoginOtp);
router.post('/verify-login-otp', authController.verifyLoginOtp);

router.post('/login-with-email', authController.login);

router.patch("/complete-profile",userAuth, upload.array('profilePhotos', 5),parseJsonArrays(['preference', 'interest', 'discover','coordinates']), authController.completeProfile)

router.post("/set-pasword",userAuth,authController.setupPassword);
router.post("/reset-password",userAuth,authController.resetPassword);


router.post("/refresh-token",authController.refreshAccessToken);
router.post("/approve-device-login",authController.approveDevice);


module.exports = router;
