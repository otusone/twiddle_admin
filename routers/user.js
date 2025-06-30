const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const {otpRateLimiter} = require('../middlewares/otpRateLimiter');
const parseJsonArrays = require('../middlewares/parseJsonArrays');
const {userAuth}=require("../middlewares/auth")

const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });


router.get('/profile',userAuth , userController.getProfile);

router.get('/filter-profile-list', userAuth, userController.getUsersForSwipe);
router.post('/swipe', userAuth, userController.handleSwipe);
router.get('/matches', userAuth, userController.getMatches);
router.get('/right-swipes', userAuth, userController.getRightSwipes);


module.exports = router;
