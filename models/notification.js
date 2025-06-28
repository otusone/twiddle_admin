const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['match', 'like', 'message'], required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seen: { type: Boolean, default: false },
    message: { type: String },
}, { timestamps: true, versionKey: false, });

module.exports = mongoose.model('Notification', notificationSchema);
