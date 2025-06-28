const OtpRateLimit = require('../models/otpRateLimit');

const MAX_ATTEMPTS = 3;
const WINDOW_MINUTES = 10;

const otpRateLimiter=async(req, res, next)=> {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: 'Mobile number required' });

  try {
    const now = new Date();
    const windowStart = new Date(now.getTime() - WINDOW_MINUTES * 60000);

    let record = await OtpRateLimit.findOne({ mobile });

    if (record) {
      if (record.firstRequestAt > windowStart) {
        if (record.attempts >= MAX_ATTEMPTS) {
          const timeLeft = Math.ceil(
            (record.firstRequestAt.getTime() + WINDOW_MINUTES * 60000 - now.getTime()) / 60000
          );
          return res.status(429).json({
            message: `Too many OTP requests. Try again in ${timeLeft} minute(s).`,
          });
        }

        // Within window, increment attempts
        record.attempts += 1;
      } else {
        // Outside window, reset
        record.attempts = 1;
        record.firstRequestAt = now;
      }

      await record.save();
    } else {
      await OtpRateLimit.create({ mobile });
    }

    next();
  } catch (err) {
    console.error('OTP Rate Limiter Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports={
    otpRateLimiter
}