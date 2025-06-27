const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const User=require("../models/user")

exports.enable2FA = async (req, res) => {
  const secret = speakeasy.generateSecret({ name: `YourApp (${req.user.email})` });
  const user = await User.findByIdAndUpdate(req.user.id, { twoFASecret: secret.base32 }, { new: true });

  const qr = await QRCode.toDataURL(secret.otpauth_url);
  res.json({ qr, secret: secret.base32 });
};

exports.verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = await User.findById(req.user.id);
  const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: 'base32',
    token,
    window: 1,
  });
  if (!verified) return res.status(401).json({ message: 'Invalid 2FA token' });

  user.is2FAEnabled = true;
  await user.save();
  res.json({ message: '2FA enabled successfully' });
};
