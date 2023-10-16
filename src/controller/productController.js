const AppError = require('../errors/AppError');
const { executeCreate, executeList, executeDetail, executeRemove, executeUpdate } = require('../services/productService');

const createProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const file = req.file;
  try {
    const createdProduct = await executeCreate(file, descricao, quantidade_estoque, valor, categoria_id);
    return res.status(201).json(createdProduct);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

const listProducts = async (req, res) => {
  const { categoria_id } = req.query;
  try {
    const products = await executeList(categoria_id);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

const detailProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await executeDetail(id);
    return res.status(200).json(product);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const file = req.file;
  try {
    await executeUpdate(id, file, descricao, quantidade_estoque, valor, categoria_id);
    return res.status(204).json();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await executeRemove(id);
    return res.status(204).json();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { createProduct, listProducts, detailProduct, removeProduct, updateProduct };
