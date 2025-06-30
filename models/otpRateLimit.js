const mongoose = require('mongoose');

const otpRateLimitSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  attempts: { type: Number, default: 1 },
  firstRequestAt: { type: Date, default: Date.now }
},{ timestamps: true, versionKey: false, });

otpRateLimitSchema.index({ firstRequestAt: 1 }, { expireAfterSeconds: 86400 }); // 1 day

module.exports = mongoose.model('OtpRateLimit', otpRateLimitSchema);
