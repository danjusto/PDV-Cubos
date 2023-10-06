const AppError = require('../errors/AppError');
const { findById } = require("../repositories/categoryRepository");
const { insertProduct } = require('../repositories/productRepository');

const executeCreate = async (descricao, quantidade_estoque, valor, categoria_id) => {
  const checkCategories = await findById(categoria_id);

  if (!checkCategories) {
    throw new AppError("Categorie not found.", 404);
  }

  const productCreated = await insertProduct(descricao, quantidade_estoque, valor, categoria_id);
  return productCreated[0]
}

module.exports = { executeCreate };