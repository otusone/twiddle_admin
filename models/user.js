const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const Session = require('./session');
const useragent = require('useragent');
const UAParser = require('ua-parser-js');

const userSchema = new mongoose.Schema({
    fullName: { type: String, },
    dateOfBirth: { type: Date, },
    gender: { type: String, enum: ['Male', 'Female', 'Non-Binary', 'Other'], },
    email: { type: String, },
    password: { type: String },
    googleId: { type: String },
    mobile: { type: String },
    purpose: { type: String, enum: ['date', 'bff', 'bizz'], },
    maxDistancePreference: { type: Number, default: 15 },
    preference: { type: [String], enum: ['men', 'women', 'non-binary people', 'anyone'], default: ['anyone'] },
    interest: { type: [String], enum: ['long term relationship', 'casual', 'dating', 'friendship', 'networking', "something casual", "don't know yet"] },
    discover: {
        type: [String], enum: [
            'travel', 'cooking', 'hiking', 'yoga', 'gaming', 'movies', 'photography',
            'music', 'pets', 'art', 'paintings', 'fitness', 'reading', 'dancing',
            'sport', 'board games', 'technology', 'fashion', 'motorcycling'
        ]
    },
    bio: { type: String, maxlength: 300 },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point', },
        coordinates: { type: [Number], default: [0, 0], }
    },

    showDistanceInProfile: { type: Boolean, default: true },
    languages: [{ type: String }],
    relationshipStatus: { type: String, enum: ['single', 'divorced', 'widowed', 'complicated'], default: 'single' },
    jobTitle: { type: String },
    company: { type: String },
    education: { type: String },
    hobbies: [{ type: String }],
    profilePhotos: [{ type: String }],
    ageRangePreference: {
        min: { type: Number, },
        max: { type: Number, },
    },
    preferredLocation: { type: String },

    rightSwipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    leftSwipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    matches: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        matchedAt: { type: Date, default: Date.now }
    }],
    profileLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],


    rightSwipesCount: { type: Number, default: 0 },
    leftSwipesCount: { type: Number, default: 0 },
    matchesCount: { type: Number, default: 0 },
    profileLikesCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    reportsReceived: { type: Number, default: 0 },
    isShadowBanned: { type: Boolean, default: false },

    isProfileComplete: { type: Boolean, default: false },
    isProfileDetailsFilled: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    accountStatus: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },


    showProfileTo: { type: String, enum: ['everyone', 'matchesOnly'], default: 'everyone' },
    showOnlineStatus: { type: Boolean, default: true },
    hideAge: { type: Boolean, default: false },

    isPremium: { type: Boolean, default: false },
    premiumExpiresAt: { type: Date },
    boostsRemaining: { type: Number, default: 0 },


    profileCompletion: { type: Number, default: 0 },

    twoFASecret: { type: String },
    is2FAEnabled: { type: Boolean, default: false },
    loginHistory: [{
        ip: { type: String },
        browser: { type: String },
        os: { type: String },
        loginAt: { type: Date }
    }]

}, { timestamps: true, versionKey: false, });



userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}
userSchema.methods.generateAuthTokens = function () {
    const user = this;

    const accessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
};


userSchema.statics.hashToken = function (token) {
    return crypto.createHash('sha256').update(token).digest('hex');
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});



userSchema.methods.createSession = async function (refreshToken, req) {
    const hashed = mongoose.model("User").hashToken(refreshToken);
    const parser = new UAParser(req.headers["user-agent"]);
    const ua = parser.getResult();

    const ip = req.ip;
    const deviceName = ua.device?.model || "Unknown Device";
    const os = `${ua.os?.name || "Unknown"} ${ua.os?.version || ""}`.trim();
    const browser = `${ua.browser?.name || "Unknown"} ${ua.browser?.version || ""}`.trim();

    const Session = mongoose.model("Session");

    const approvedSessionCount = await Session.countDocuments({
        userId: this._id,
        status: "approved",
    });

    let existingSession = await Session.findOne({
        userId: this._id,
        deviceName,
        os,
        browser,
        ip,
    });

    if (existingSession) {
        if (existingSession.status === "approved") {
            existingSession.refreshTokenHash = hashed;
            existingSession.loginTime = new Date();
            existingSession.lastUsedAt = new Date();
            existingSession.isValid = true;
            await existingSession.save();
            return existingSession;
        }

        // Return pending/rejected sessions to controller to handle
        return existingSession;
    }

    // First-time login device is auto-approved
    const status = approvedSessionCount === 0 ? "approved" : "pending";

    const newSession = await Session.create({
        userId: this._id,
        refreshTokenHash: hashed,
        ip,
        deviceName,
        os,
        browser,
        status,
        loginTime: new Date(),
        lastUsedAt: new Date(),
        isValid: status === "approved",
    });

    return newSession;
};


userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);