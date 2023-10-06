const AppError = require('../errors/AppError');
const { executeCreate } = require('../services/productService');

const createProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const createProduct = await executeCreate(descricao, quantidade_estoque, valor, categoria_id);
    return res.status(201).json(createProduct);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error)
    return res.status(500).json({ message: 'Server error.' });
  }
}


module.exports = { createProduct }