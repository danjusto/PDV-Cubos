const AppError = require('../errors/AppError');
const { executeCreate, executeList, executeDetail, executeRemove, executeUpdate } = require('../services/productService');

const createProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  try {
    const createProduct = await executeCreate(descricao, quantidade_estoque, valor, categoria_id);
    return res.status(201).json(createProduct);
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
    const productData = await executeDetail(id);
    return res.status(200).json(productData);
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
  try {
    await executeUpdate(id, descricao, quantidade_estoque, valor, categoria_id);
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
