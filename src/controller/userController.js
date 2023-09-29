const AppError = require('../errors/AppError');
const { executeCreate, executeUpdate } = require('../services/userService');

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
  const { id } = req.params;
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
}

module.exports = {
  createUser,
  updateUser,
  loginUser
};
