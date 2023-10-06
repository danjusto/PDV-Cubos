const AppError = require('../errors/AppError');
const {
  findProducts,
  findProductsByCategory,
  findProductByid,
  removeProduct
} = require('../repositories/productRepository');

const executeList = async (categoria_id) => {
  if (categoria_id) {
    return await findProductsByCategory(categoria_id);
  }
  return await findProducts();
};

const executeDetail = async (id) => {
  const product = await findProductByid(id);
  if (!product) {
    throw new AppError('Product not found.', 404);
  }
  return product;
};

const executeRemove = async (id) => {
    const product = await findProductByid(id);
    if (!product) {
      throw new AppError('Product not found.', 404);
    }
    removeProduct(id);
  };

module.exports = { executeList, executeDetail, executeRemove };
