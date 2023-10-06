const AppError = require('../errors/AppError');
const {
  findProducts,
  findProductByid,
  removeProduct
} = require('../repositories/productRepository');

const executeList = async () => {
  return await findProducts();
};

const executeDetail = async (id) => {
  const product = await findProductByid(id);
  if (!product) {
    throw new AppError('Client not found.', 404);
  }
  return product;
};

const executeRemove = async (id) => {
    const product = await findProductByid(id);
    if (!product) {
      throw new AppError('Client not found.', 404);
    }
    removeProduct();
  };

module.exports = { executeList, executeDetail, executeRemove };
