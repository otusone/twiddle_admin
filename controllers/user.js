const mongoose = require('mongoose');
const User = require('../models/user');
const Session = require('../models/session');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const SwipeLog = require('../models/swipeLog');
const { sendSocketNotification } = require('../utils/sendNotification');
const { mapPreferencesToGenders } = require("../services/mapPreferencesToGenders")
const SWIPE_LIMIT_FREE = 50;

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password -twoFASecret -loginHistory');
        if (!user) return sendError(res, {}, 'User not found', 404);

        return sendSuccess(res, { user }, 'User profile fetched successfully');
    } catch (error) {
        console.error('Get Profile Error:', error);
        return sendError(res, error, 'Failed to fetch profile');
    }
};

exports.handleSwipe = async (req, res) => {
    try {
        const { targetUserId, direction } = req.body;
        console.log("targetUserId", targetUserId);
        console.log("direction", direction);
        const { _id: userId, isPremium } = req.user;

        const swipeCount = await SwipeLog.countDocuments({
            userId,
            createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        });

        if (!isPremium && swipeCount >= SWIPE_LIMIT_FREE) {
            return sendError(res, {}, "Daily swipe limit reached.", 429);
        }

        await SwipeLog.create({ userId });

        if (!['left', 'right'].includes(direction)) {
            return sendError(res, {}, 'Invalid swipe direction', 400);
        }

        if (userId.toString() === targetUserId) {
            return sendError(res, {}, "You can't swipe on your own profile.", 400);
        }

        const [user, targetUser] = await Promise.all([
            User.findById(userId),
            User.findById(targetUserId)
        ]);

        if (!user || !targetUser) {
            return sendError(res, {}, 'User not found', 404);
        }

        const alreadySwipedOrMatched = user.rightSwipes.includes(targetUserId) ||
            user.leftSwipes.includes(targetUserId) ||
            user.matches.some(match => match.user.toString() === targetUserId);

        if (alreadySwipedOrMatched) {
            return sendError(res, {}, 'Already swiped or matched with this user', 409);
        }

        if (direction === 'left') {
            user.leftSwipes.push(targetUserId);
            user.leftSwipesCount++;
            await user.save();
            return sendSuccess(res, {}, 'Left swipe recorded');
        }

        // Right swipe logic
        user.rightSwipes.push(targetUserId);
        user.rightSwipesCount++;
        targetUser.profileLikesCount++;

        const isMutual = targetUser.rightSwipes.includes(userId);
        if (isMutual) {
            const matchedAt = new Date();
            user.matches.push({ user: targetUserId, matchedAt });
            user.matchesCount++;
            targetUser.matches.push({ user: userId, matchedAt });
            targetUser.matchesCount++;

            await Chat.create({
                participants: [userId, targetUserId],
                messages: [],
                lastMessage: "Congratulations! A match is made. 🎉"
            });

            const notifications = [
                { userId, senderId: targetUserId, type: 'match', message: "You matched with someone!" },
                { userId: targetUserId, senderId: userId, type: 'match', message: "You matched with someone!" }
            ];
            await Notification.insertMany(notifications);

            for (let n of notifications) {
                sendSocketNotification(n.userId, 'match_notification', {
                    matchedWith: n.senderId,
                    message: n.message
                });
                console.log("notification send")
            }
        }

        await user.save();
        await targetUser.save();

        return sendSuccess(res, {}, isMutual ? "It's a match! You can now chat." : 'Right swipe recorded');
    } catch (err) {
        console.error(err);
        return sendError(res, err, err.message || 'Internal server error');
    }
};

exports.getMatches = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('matches.user', 'fullName profilePhotos gender');

        return sendSuccess(res, { matches: user.matches }, 'Matched users retrieved');
    } catch (err) {
        console.error(err);
        return sendError(res, err, 'Failed to get matched users');
    }
};

exports.getRightSwipes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('rightSwipes', 'fullName profilePhotos gender');

        return sendSuccess(res, { rightSwipes: user.rightSwipes }, 'Right swipes retrieved');
    } catch (err) {
        console.error(err);
        return sendError(res, err, 'Failed to get right swipes');
    }
};

exports.getSwipeHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId)
            .populate('rightSwipes', 'fullName profilePhotos')
            .populate('leftSwipes', 'fullName profilePhotos')
            .populate('matches.user', 'fullName profilePhotos');

        if (!user) {
            return sendError(res, {}, 'User not found', 404);
        }

        return sendSuccess(res, {
            rightSwipes: user.rightSwipes,
            leftSwipes: user.leftSwipes,
            matches: user.matches,
        }, 'Swipe history fetched successfully');
    } catch (err) {
        console.error(err);
        return sendError(res, err, 'Failed to fetch swipe history');
    }
};

exports.unmatchUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { targetUserId } = req.body;

        const [user, targetUser] = await Promise.all([
            User.findById(userId),
            User.findById(targetUserId)
        ]);

        if (!user || !targetUser) {
            return sendError(res, {}, 'User not found', 404);
        }

        user.matches = user.matches.filter(m => m.user.toString() !== targetUserId);
        targetUser.matches = targetUser.matches.filter(m => m.user.toString() !== userId);

        user.matchesCount = Math.max(user.matchesCount - 1, 0);
        targetUser.matchesCount = Math.max(targetUser.matchesCount - 1, 0);

        await user.save();
        await targetUser.save();

        return sendSuccess(res, {}, 'Unmatched successfully');
    } catch (err) {
        console.error(err);
        return sendError(res, err, 'Failed to unmatch user');
    }
};

exports.getUsersForSwipeWithoutDistanceCalc = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const currentUser = await User.findById(userId);

        if (!currentUser) {
            return sendError(res, {}, 'User not found', 404);
        }

        const preferences = currentUser.preference || ['anyone'];
        const excludedIds = [
            ...currentUser.rightSwipes,
            ...currentUser.leftSwipes,
            ...currentUser.matches.map(m => m.user.toString()),
            userId.toString()
        ];

        const genderFilter = preferences.includes('anyone')
            ? { gender: { $exists: true } }
            : { gender: { $in: mapPreferencesToGenders(preferences) } };

        const locationFilter = currentUser.location?.coordinates?.length === 2
            ? {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: currentUser.location.coordinates
                        },
                        $maxDistance: currentUser.maxDistancePreference * 1000 // in meters
                    }
                }
            }
            : {};

        const users = await User.find({
            _id: { $nin: excludedIds },
            accountStatus: 'active',
            isProfileDetailsFilled: true,
            ...genderFilter,
            ...locationFilter
        })
            .limit(50)
            .select('-password -loginHistory -is2FAEnabled -boostsRemaining -isPremium -isEmailVerified -isMobileVerified -isProfileDetailsFilled -matchesCount -leftSwipesCount -rightSwipesCount -leftSwipes -rightSwipes -matches -maxDistancePreference ');

        return sendSuccess(res, users, 'Users fetched for swiping');
    } catch (error) {
        console.error('getUsersForSwipe error:', error);
        return sendError(res, error, 'Failed to get users for swiping');
    }
};


exports.getUsersForSwipe = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return sendError(res, {}, 'User not found', 404);
    }

    const preferences = currentUser.preference || ['anyone'];
    const excludedIds = [
      ...currentUser.rightSwipes,
      ...currentUser.leftSwipes,
      ...currentUser.matches.map(m => m.user.toString()),
      userId.toString()
    ];

    const genderFilter = preferences.includes('anyone')
      ? {}
      : { gender: { $in: mapPreferencesToGenders(preferences) } };

    const maxDistance = (currentUser.maxDistancePreference || 15) * 1000; // meters
    const userCoordinates = currentUser.location?.coordinates || [0, 0];

    console.log("genderFilter",genderFilter)

    const users = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: userCoordinates
          },
          distanceField: "distance", // calculated distance in meters
          spherical: true,
          maxDistance: maxDistance,
          query: {
            _id: { $nin: excludedIds.map(id => new mongoose.Types.ObjectId(id)) },
            accountStatus: 'active',
            isProfileDetailsFilled: true,
            ...genderFilter
          }
        }
      },
      {
        $limit: 50
      },
      {
        $project: {
          password: 0,
          loginHistory: 0,
          is2FAEnabled: 0,
          boostsRemaining: 0,
          isPremium: 0,
          isEmailVerified: 0,
          isMobileVerified: 0,
          isProfileDetailsFilled: 0,
          matchesCount: 0,
          leftSwipesCount: 0,
          rightSwipesCount: 0,
          leftSwipes: 0,
          rightSwipes: 0,
          matches: 0,
          maxDistancePreference: 0
        }
      }
    ]);

    return sendSuccess(res, users, 'Users fetched for swiping with distance');
  } catch (error) {
    console.error('getUsersForSwipe error:', error);
    return sendError(res, error,  error.message || 'Failed to get users for swiping');
  }
};
