const AppError = require('../errors/AppError');
const { executeCreate, executeUpdate, executeLogin, executeDetail } = require('../services/userService');

const createUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const createdUser = await executeCreate(nome, email, senha);
    return res.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

const updateUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const id = req.userId;
  try {
    await executeUpdate(id, nome, email, senha);
    return res.status(204).json();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

const detailUser = async (req, res) => {
  const id = req.userId;
  try {
    const user = await executeDetail(id);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const token = await executeLogin(email, senha);
    return res.status(200).json({ type: 'Bearer', token });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { createUser, updateUser, detailUser, loginUser };
