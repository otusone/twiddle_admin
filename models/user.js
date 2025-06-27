const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: { type: String, },
    dateOfBirth: { type: Date, },
    gender: { type: String, enum: ['male', 'female', 'non-binary', 'other'], },
    email: { type: String, },
    password: { type: String },
    googleId: { type: String },
    mobile: { type: String },
    purpose: { type: String, enum: ['date', 'bff', 'bizz'], },
    preference: { type: [String], enum: ['men', 'women', 'non-binary people', 'anyone'], default: ['anyone'] },
    interest: { type: [String], enum: ['long term relationship', 'casual', 'dating', 'friendship', 'networking', "something casual", "don't know yet"] },
    discover: {
        type: [String], enum: [
            'travel', 'cooking', 'hiking', 'yoga', 'gaming', 'movies', 'photography',
            'music', 'pets', 'art', 'paintings', 'fitness', 'reading', 'dancing',
            'sport', 'board games', 'technology', 'fashion', 'motorcycling'
        ]
    },
    profilePhotos: [{ type: String }],
    twoFASecret: { type: String },
    is2FAEnabled: { type: Boolean, default: false },
    loginHistory: [{
        ip: { type: String },
        browser: { type: String },
        os: { type: String },
        loginAt: { type: Date }
    }]

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);