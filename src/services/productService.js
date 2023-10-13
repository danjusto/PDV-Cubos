const AppError = require('../errors/AppError');
const { insert, findAll, findByCategory, findById, remove, update, findByDescription, findByDescriptionAndDifferentId, findByIdAndInexistingOrder } = require('../repositories/productRepository');
const { findById: findCategoryById } = require('../repositories/categoryRepository');
const { deleteFile } = require('../storage/upload');

const executeCreate = async (descricao, quantidade_estoque, valor, categoria_id, produto_imagem) => {
  const checkCategories = await findCategoryById(categoria_id);
  if (!checkCategories) {
    throw new AppError('Category not found.', 404);
  }
  const checkProductDescriptionExist = await findByDescription(descricao);
  if (checkProductDescriptionExist) {
    throw new AppError('Description already exists.', 400);
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

const executeUpdate = async (id, descricao, quantidade_estoque, valor, categoria_id, produto_imagem) => {
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
  const pathImage = product.produto_imagem.replace(process.env.BUCKET_BASE_URL, '');
  const preparedPathImage = pathImage.replace('%20', ' ');
  deleteFile(preparedPathImage);
  remove(id);
};

module.exports = { executeCreate, executeList, executeDetail, executeRemove, executeUpdate };
