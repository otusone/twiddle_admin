const OtpRateLimit = require('../models/otpRateLimit');
const { sendError } = require('../utils/responseHandler'); 

const MAX_ATTEMPTS = 3;
const WINDOW_MINUTES = 10;

const otpRateLimiter = async (req, res, next) => {
  const { mobile } = req.body;

  if (!mobile) {
    return sendError(res, {}, 'Mobile number is required', 400);
  }

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
          return sendError(
            res,
            {},
            `Too many OTP requests. Try again in ${timeLeft} minute(s).`,
            429
          );
        }

        // Still within window, increment attempts
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
  } catch (error) {
    console.error('OTP Rate Limiter Error:', error);
    return sendError(res, error, 'Internal server error', 500);
  }
};

module.exports = {
  otpRateLimiter,
};
