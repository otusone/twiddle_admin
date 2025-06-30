const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        timestamp: { type: Date, default: Date.now }
    }],
    lastMessage: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true, versionKey: false, });

module.exports = mongoose.model('Chat', chatSchema);
