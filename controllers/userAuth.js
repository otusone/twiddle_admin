const User = require('../models/user');
const OTP = require('../models/otp');
const Session = require('../models/session');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const useragent = require('useragent');
const calculateProfileCompletion = require('../services/profileCompletion');
const cloudinary = require("../config/cloudinary");
const jwt = require("jsonwebtoken");

exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return sendError(res, {}, 'Mobile number is required', 400);

    const otp = '1234';
    await OTP.findOneAndUpdate({ mobile }, { otp, createdAt: new Date() }, { upsert: true, new: true });

    return sendSuccess(res, {}, 'OTP sent (1234 for dev)');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to send OTP');
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) return sendError(res, {}, 'Mobile and OTP required', 400);

    const record = await OTP.findOne({ mobile });
    if (!record || record.otp !== otp) return sendError(res, {}, 'Invalid or expired OTP', 400);

    await OTP.deleteOne({ mobile });

    let user = await User.findOne({ mobile });
    if (!user) user = await User.create({ mobile });

    const activeSessions = await Session.find({ userId: user._id, isValid: true });
    if (activeSessions.length >= 3) return sendError(res, {}, 'Maximum device limit reached', 403);

    const { accessToken, refreshToken } = user.generateAuthTokens();
    const session = await user.createSession(refreshToken, req);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendSuccess(res, { accessToken, user, userExists: !!user.fullName }, 'OTP verified successfully');
  } catch (error) {
    console.error("error", error);
    return sendError(res, error, error.message || 'OTP verification failed');
  }
};

exports.completeProfile = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const {
      fullName, dateOfBirth, gender, email,
      purpose, preference, interest, discover, maxDistancePreference,
      coordinates
    } = req.body;

    const user = await User.findById(userId);
    if (!user) return sendError(res, {}, 'User not found', 404);

    let profileImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const imageName = `TWIDDLE_${Math.floor(Math.random() * 10)}_${file.originalname.split('.')[0]}`;
          const result = await cloudinary.uploader.upload(file.path, { public_id: imageName });
          profileImages.push(result.secure_url);
        } catch (uploadError) {
          throw new Error("Attachment upload failed: " + uploadError.message);
        }
      }
    }

    let parsedCoordinates = [0, 0];
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])
    ) {
      parsedCoordinates = coordinates.map(Number);
    }
    Object.assign(user, {
      fullName, dateOfBirth, gender, email, maxDistancePreference,
      purpose, preference, interest, discover, profilePhotos: profileImages,
      isProfileDetailsFilled: true,
      location: {
        type: 'Point',
        coordinates:parsedCoordinates
      }
    });


    user.profileCompletion = calculateProfileCompletion(user);
    user.isProfileComplete = user.profileCompletion === 100;
    await user.save();

    return sendSuccess(res, { user }, 'Profile completed successfully');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to complete profile');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return sendError(res, {}, 'Invalid credentials', 401);

    const sessions = await Session.find({ userId: user._id, isValid: true });
    if (sessions.length >= 3) return sendError(res, {}, 'Maximum device limit reached', 403);

    const { accessToken, refreshToken } = user.generateAuthTokens();
    const session = await user.createSession(refreshToken, req);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    if (session.status !== "approved") {
      return sendError(res, {
        sessionId: session._id,
        deviceName: session.deviceName,
        os: session.os,
        browser: session.browser,
      }, 'New device detected. Please approve this session to continue.', 403);
    }

    return sendSuccess(res, {
      accessToken, sessionId: session._id, sessionStatus: session.status,
      userExists: !!user.fullName,
    }, session.status === 'approved' ? 'Login successful' : 'New device detected. Approval required.');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Login failed');
  }
};

exports.sendLoginOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return sendError(res, {}, 'Mobile number is required', 400);

    const otp = '1234';
    await OTP.findOneAndUpdate({ mobile }, { otp, createdAt: new Date() }, { upsert: true, new: true });

    return sendSuccess(res, {}, 'OTP sent (1234 for dev)');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to send OTP');
  }
};

exports.verifyLoginOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) return sendError(res, {}, 'Mobile and OTP are required', 400);

    const user = await User.findOne({ mobile });
    if (!user) return sendError(res, {}, 'User not found', 404);

    const record = await OTP.findOne({ mobile });
    if (!record || record.otp !== otp) return sendError(res, {}, 'Invalid or expired OTP', 400);

    await OTP.deleteOne({ mobile });

    const activeSessions = await Session.find({ userId: user._id, isValid: true });
    if (activeSessions.length >= 3) return sendError(res, {}, 'Maximum device limit reached', 403);

    const { accessToken, refreshToken } = user.generateAuthTokens();
    const session = await user.createSession(refreshToken, req);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    if (session.status !== "approved") {
      return sendError(res, {
        sessionId: session._id,
        deviceName: session.deviceName,
        os: session.os,
        browser: session.browser,
      }, 'New device detected. Please approve this session to continue.', 403);
    }
    return sendSuccess(res, { accessToken, user, userExists: !!user.fullName }, 'Login successful');
  } catch (error) {
    console.error(error);
    return sendError(res, error, 'OTP verification failed');
  }
};

exports.refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return sendError(res, {}, "Refresh token missing", 401);

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const hashed = User.hashToken(refreshToken);
    console.log("hashed", hashed)
    const session = await Session.findOne({ userId: decoded.id, refreshTokenHash: hashed });
    if (!session) return sendError(res, {}, "Invalid session", 403);

    // Check inactivity (7 days)
    const inactiveFor = Date.now() - new Date(session.lastUsedAt).getTime();
    const maxInactive = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

    if (inactiveFor > maxInactive) {
      await session.deleteOne();
      return sendError(res, {}, "Session expired due to inactivity", 403);
    }

    // Update last used time
    session.lastUsedAt = new Date();
    await session.save();

    const user = await User.findById(decoded.id);
    if (!user) return sendError(res, {}, "User not found", 404);

    const accessToken = user.generateAccessToken();

    return sendSuccess(res, { accessToken }, "New access token issued");

  } catch (err) {
    console.error(err);
    return sendError(res, {}, "Invalid refresh token", 403);
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return sendSuccess(res, {}, 'Logged out');

    const hashed = User.hashToken(token);
    await Session.findOneAndUpdate({ refreshTokenHash: hashed }, { isValid: false });

    res.clearCookie('refreshToken');
    return sendSuccess(res, {}, 'Logged out successfully');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Logout failed');
  }
};

exports.getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id, isValid: true }).select('-refreshTokenHash');
    return sendSuccess(res, { sessions });
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to fetch active sessions');
  }
};

exports.logoutFromDevice = async (req, res) => {
  try {
    const { sessionId } = req.params;
    await Session.findOneAndUpdate({ _id: sessionId, userId: req.user.id }, { isValid: false });
    return sendSuccess(res, {}, 'Logged out from device');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to logout from device');
  }
};

// profile
exports.updateBasicInfo = async (req, res) => {
  try {
    const { fullName, dateOfBirth, gender, bio } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, {}, 'User not found', 404);

    if (fullName) user.fullName = fullName;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;
    if (bio) user.bio = bio;

    user.profileCompletion = calculateProfileCompletion(user);
    user.isProfileComplete = user.profileCompletion === 100;

    await user.save();
    return sendSuccess(res, { user }, 'Basic info updated');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to update basic info');
  }
};

exports.updatePreferenceSection = async (req, res) => {
  try {
    const { purpose, preference, interest, discover } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, {}, 'User not found', 404);

    if (purpose) user.purpose = purpose;
    if (preference) user.preference = preference;
    if (interest) user.interest = interest;
    if (discover) user.discover = discover;

    user.profileCompletion = calculateProfileCompletion(user);
    user.isProfileComplete = user.profileCompletion === 100;
    await user.save();

    return sendSuccess(res, { user }, 'Preferences updated');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to update preferences');
  }
};

exports.updateContactLocation = async (req, res) => {
  try {
    const { email, languages, location } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, {}, 'User not found', 404);

    if (email) user.email = email;
    if (languages) user.languages = languages;
    if (location) user.location = location;

    user.profileCompletion = calculateProfileCompletion(user);
    user.isProfileComplete = user.profileCompletion === 100;
    await user.save();

    return sendSuccess(res, { user }, 'Contact & location updated');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to update contact details');
  }
};

exports.updateWorkEducation = async (req, res) => {
  try {
    const { jobTitle, company, education } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, {}, 'User not found', 404);

    if (jobTitle) user.jobTitle = jobTitle;
    if (company) user.company = company;
    if (education) user.education = education;

    user.profileCompletion = calculateProfileCompletion(user);
    user.isProfileComplete = user.profileCompletion === 100;
    await user.save();

    return sendSuccess(res, { user }, 'Work & education updated');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to update work/education');
  }
};

exports.updateVisibilitySettings = async (req, res) => {
  try {
    const { showProfileTo, showOnlineStatus, hideAge } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, {}, 'User not found', 404);

    if (showProfileTo !== undefined) user.showProfileTo = showProfileTo;
    if (showOnlineStatus !== undefined) user.showOnlineStatus = showOnlineStatus;
    if (hideAge !== undefined) user.hideAge = hideAge;

    user.profileCompletion = calculateProfileCompletion(user);
    user.isProfileComplete = user.profileCompletion === 100;
    await user.save();

    return sendSuccess(res, { user }, 'Visibility settings updated');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to update visibility');
  }
};

exports.updateProfilePhotos = async (req, res) => {
  try {
    const { profilePhotos } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, {}, 'User not found', 404);

    if (profilePhotos) user.profilePhotos = profilePhotos;

    user.profileCompletion = calculateProfileCompletion(user);
    user.isProfileComplete = user.profileCompletion === 100;
    await user.save();

    return sendSuccess(res, { user }, 'Profile photos updated');
  } catch (error) {
    console.error(error);
    return sendError(res, error, error.message || 'Failed to update profile photos');
  }
};

exports.setupPassword = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { password } = req.body;
    if (!password || password.length < 6) {
      return sendError(res, {}, 'Password must be at least 6 characters long', 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, {}, 'User not found', 404);
    }

    user.password = password;
    await user.save();

    return sendSuccess(res, {}, 'Password set successfully. You can now log in with email and password.');
  } catch (error) {
    console.error('Setup Password Error:', error);
    return sendError(res, error, error.message || 'Failed to set up password');
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { password } = req.body;

    if (!password) {
      return sendError(res, {}, 'Mobile and new password are required', 400);
    }

    if (password.length < 6) {
      return sendError(res, {}, 'Password must be at least 6 characters long', 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, {}, 'User not found', 404);
    }

    user.password = password;
    await user.save();

    return sendSuccess(res, {}, 'Password reset successfully. You can now log in with your new password.');
  } catch (error) {
    console.error('Reset Password Error:', error);
    return sendError(res, error, error.message || 'Failed to reset password');
  }
};


exports.approveDevice = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findById(sessionId);
    if (!session) return sendError(res, {}, "Session not found", 404);

    if (session.userId.toString() !== req.user._id.toString())
      return sendError(res, {}, "Unauthorized", 403);

    session.status = 'approved';
    await session.save();

    return sendSuccess(res, {}, "Device approved successfully");
  } catch (err) {
    console.error(err);
    return sendError(res, err, "Failed to approve device");
  }
};

// just for testing purpose 
exports.getPendingDevices = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id, status: 'pending' });
    return sendSuccess(res, { sessions });
  } catch (err) {
    console.error(err);
    return sendError(res, err, "Failed to fetch pending devices");
  }
};
