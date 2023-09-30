const AppError = require('../errors/AppError');
const auth = require('../utils/auth');
const { executeCreate, executeUpdate, executeLogin } = require('../services/userService');

const createUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const createdUser = await executeCreate(nome, email, senha);
    return res.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Server error." });
  }
};

const updateUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const id = req.userId
  try {
    await executeUpdate(id, nome, email, senha);
    return res.status(204).json();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Server error." });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const token = await executeLogin(email, senha);
    return res.status(200).json({ type: 'Bearer', token });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createUser,
  updateUser,
  loginUser
};
