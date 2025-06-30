const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  refreshTokenHash: { type: String, required: true },
  ip: String,
  deviceName: String,
  os: String,
  browser: String,
  loginTime: { type: Date, default: Date.now },
  lastUsed: { type: Date, default: Date.now },
  isValid: { type: Boolean, default: true },
  lastUsedAt: { type: Date, default: Date.now },
  status: {type:String,enum: ['pending', 'approved', 'rejected'],default: 'pending'}
}, { timestamps: true });

sessionSchema.index({ userId: 1, deviceName: 1, os: 1, browser: 1 });

module.exports = mongoose.model('Session', sessionSchema);
