const AppError = require('../errors/AppError');
const { insert, findAll, findByCategory, findById, remove, update, findByDescription, findByDescriptionAndDifferentId, findByIdAndInexistingOrder } = require('../repositories/productRepository');
const { findById: findCategoryById } = require('../repositories/categoryRepository');
const { fileCheck, removeFile } = require('../utils/fileFunctions');

const executeCreate = async (file, descricao, quantidade_estoque, valor, categoria_id) => {
  const checkCategories = await findCategoryById(categoria_id);
  if (!checkCategories) {
    throw new AppError('Category not found.', 404);
  }
  const checkProductDescriptionExist = await findByDescription(descricao);
  if (checkProductDescriptionExist) {
    throw new AppError('Description already exists.', 400);
  }
  let produto_imagem;
  if (file) {
    produto_imagem = await fileCheck(file, descricao);
  }
  const createdProduct = await insert(descricao, quantidade_estoque, valor, categoria_id, produto_imagem);
  return createdProduct[0];
};

const executeList = async (categoria_id) => {
  if (categoria_id) {
    return await findByCategory(categoria_id);
  }
  return await findAll();
};

const executeDetail = async (id) => {
  const product = await findById(id);
  if (!product) {
    throw new AppError('Product not found.', 404);
  }
  return product;
};

const executeUpdate = async (id, file, descricao, quantidade_estoque, valor, categoria_id) => {
  const product = await findById(id);
  if (!product) {
    throw new AppError('Product not found.', 404);
  }
  const checkCategory = await findCategoryById(categoria_id);
  if (!checkCategory) {
    throw new AppError('Category not found.', 404);
  }
  const checkProductDescriptionExist = await findByDescriptionAndDifferentId(descricao, id);
  if (checkProductDescriptionExist) {
    throw new AppError('Description already exists.', 400);
  }
  let produto_imagem = product.produto_imagem;
  if (file) {
    removeFile(produto_imagem);
    produto_imagem = await fileCheck(file, descricao);
  }
  await update(id, descricao, quantidade_estoque, valor, categoria_id, produto_imagem);
};

const executeRemove = async (id) => {
  const product = await findById(id);
  if (!product) {
    throw new AppError('Product not found.', 404);
  }
  const checkInexistingOrder = await findByIdAndInexistingOrder(id);
  if (checkInexistingOrder) {
    throw new AppError('This product is linked to an order.', 400);
  }
  removeFile(product);
  remove(id);
};

module.exports = { executeCreate, executeList, executeDetail, executeRemove, executeUpdate };
