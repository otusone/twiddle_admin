const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // auto-delete in 5 minutes
},{ timestamps: true, versionKey: false, });

module.exports = mongoose.model('Otp', otpSchema);
