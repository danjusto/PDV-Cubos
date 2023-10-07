const { verify } = require('jsonwebtoken');
require('dotenv').config();

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Failure to get token.' });
  }
  const token = authorization.split(' ')[1];
  try {
    const validToken = verify(token, process.env.JWT_SECRET);
    req.userId = validToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;
