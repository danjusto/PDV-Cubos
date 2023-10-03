const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

module.exports = { generateToken };
