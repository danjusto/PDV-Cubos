const AppError = require('../errors/AppError');
const {
  insertProduct,
  findProducts,
  findProductsByCategory,
  findProductByid,
  removeProduct
} = require('../repositories/productRepository');
const { findById } = require("../repositories/categoryRepository");

const executeCreate = async (descricao, quantidade_estoque, valor, categoria_id) => {
  const checkCategories = await findById(categoria_id);

  if (!checkCategories) {
    throw new AppError("Categorie not found.", 404);
  };

  const productCreated = await insertProduct(descricao, quantidade_estoque, valor, categoria_id);
  return productCreated[0]
};

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

module.exports = { executeCreate, executeList, executeDetail, executeRemove };
