const AppError = require('../errors/AppError');
const {
  insertProduct,
  findProducts,
  findProductsByCategory,
  findProductByid,
  removeProduct,
  updateProduct,
  findProductByDescription,
  findProductByDescriptionAndDifferentId
} = require('../repositories/productRepository');
const categoryRepository = require("../repositories/categoryRepository");

const executeCreate = async (descricao, quantidade_estoque, valor, categoria_id) => {
  const checkCategories = await categoryRepository.findById(categoria_id);
  if (!checkCategories) {
    throw new AppError("Category not found.", 404);
  };

  const checkProductDescriptionExist = await findProductByDescription(descricao);
  if (checkProductDescriptionExist) {
    throw new AppError("Description already exists.", 400);
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

const executeUpdate = async (id, descricao, quantidade_estoque, valor, categoria_id) => {
  const product = await findProductByid(id)
  if (!product) {
    throw new AppError('Product not found.', 404);
  };

  const checkCategory = await categoryRepository.findById(categoria_id);
  if (!checkCategory) {
    throw new AppError("Category not found.", 404);
  };

  const checkProductDescriptionExist = await findProductByDescriptionAndDifferentId(descricao, id);
  if (checkProductDescriptionExist) {
    throw new AppError("Description already exists.", 400);
  };

  await updateProduct(id, descricao, quantidade_estoque, valor, categoria_id)

}

const executeRemove = async (id) => {
  const product = await findProductByid(id);
  if (!product) {
    throw new AppError('Product not found.', 404);
  }
  removeProduct(id);
};

module.exports = { executeCreate, executeList, executeDetail, executeRemove, executeUpdate };
