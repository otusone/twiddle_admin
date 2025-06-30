const { sendError } = require('../utils/responseHandler');

module.exports = (fields = []) => (req, res, next) => {
  try {
    fields.forEach(field => {
      if (typeof req.body[field] === 'string') {
        req.body[field] = JSON.parse(req.body[field]);
      }
    });
    next();
  } catch (err) {
    console.error('Error parsing JSON arrays:', err);
    return sendError(res, {}, `Invalid JSON format in one of: ${fields.join(', ')}`, 400);
  }
};
