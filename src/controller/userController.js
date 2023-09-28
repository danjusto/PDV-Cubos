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
  try {
    const updateUser = await executeUpdate(nome, email, senha);
    return res.status(201).json({mensage: "usuario editado com sucesso"});
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createUser,
  updateUser
};
