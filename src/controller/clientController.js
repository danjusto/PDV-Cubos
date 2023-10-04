const { executeCreate } = require('../services/clientService.js');
const AppError = require('../errors/AppError');
const createClient = async (req, res) => {
  const { nome, email, cpf } = req.body;
  try {
    const createdClient = await executeCreate(nome, email, cpf);
    return res.status(201).json(createdClient);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { createClient };
