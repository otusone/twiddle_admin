const User = require('../models/user');
const OTP = require('../models/Otp');
const jwt = require('jsonwebtoken');
const Session = require('../models/session');
const { generateTokens, hashToken } = require('../utils/tokenGenerator');
const useragent = require('useragent');

exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ message: 'Mobile number is required' });

    await OTP.findOneAndUpdate(
      { mobile },
      { otp: '1234' },
      { upsert: true, new: true }
    );

    res.json({ message: 'OTP sent to mobile (1234)' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) return res.status(400).json({ message: 'Mobile and OTP required' });
    if (otp !== '1234') return res.status(400).json({ message: 'Invalid OTP' });

    let user = await User.findOne({ mobile });
    if (!user) user = await User.create({ mobile });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      accessToken,
      message: 'OTP verified successfully',
      userExists: !!user.fullName,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'OTP verification failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const agent = useragent.parse(req.headers['user-agent']);
    const deviceInfo = {
      ip: req.ip,
      deviceName: agent.device.toString(),
      os: agent.os.toString(),
      browser: agent.toAgent(),
    };

    const sessions = await Session.find({ userId: user._id, isValid: true });
    if (sessions.length >= 3) {
      return res.status(403).json({ message: 'Maximum device limit reached. Logout from other devices.' });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    const hashedRefreshToken = hashToken(refreshToken);

    await Session.create({
      userId: user._id,
      refreshTokenHash: hashedRefreshToken,
      ...deviceInfo,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({ accessToken, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const hashedToken = hashToken(token);
    const session = await Session.findOne({ refreshTokenHash: hashedToken, isValid: true });
    if (!session) return res.status(403).json({ message: 'Invalid session' });

    const user = await User.findById(session.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    session.isValid = false;
    await session.save();

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    const newHash = hashToken(newRefreshToken);

    await Session.create({
      userId: user._id,
      refreshTokenHash: newHash,
      ip: req.ip,
      deviceName: session.deviceName,
      os: session.os,
      browser: session.browser,
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to refresh token' });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(200).json({ message: 'Logged out' });

    const hashedToken = hashToken(token);
    await Session.findOneAndUpdate(
      { refreshTokenHash: hashedToken },
      { isValid: false }
    );

    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Logout failed' });
  }
};

exports.getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id, isValid: true }).select('-refreshTokenHash');
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch active sessions' });
  }
};

exports.logoutFromDevice = async (req, res) => {
  try {
    const { sessionId } = req.params;
    await Session.findOneAndUpdate({ _id: sessionId, userId: req.user.id }, { isValid: false });
    res.json({ message: 'Logged out from device' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to logout from device' });
  }
};
