const knex = require('../database/connection');

const findProducts = async () => {
  return await knex('products');
};

const findProductsByCategory = async (categoria_id) => {
  return await knex('products').where('categoria_id', categoria_id);
};

const findProductByid = async (id) => {
  return await knex('products').where('id', id).first();
};

const insertProduct = async (descricao, quantidade_estoque, valor, categoria_id) => {
  return await knex('products')
    .insert({ descricao, quantidade_estoque, valor, categoria_id })
    .returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id']);
};

const removeProduct = async (id) => {
  return await knex('products').where('id', id).del();
};

const updateProduct = async (id, descricao, quantidade_estoque, valor, categoria_id) => {
  return await knex('products')
    .where('id', id)
    .update({ descricao, quantidade_estoque, valor, categoria_id })
};

const findProductByDescription = async (descricao) => {
  return await knex('products').whereILike('descricao', descricao).first();
}

const findProductByDescriptionAndDifferentId = async (descricao, id) => {
  return await knex('products').whereILike('descricao', descricao).andWhere('id', '!=', id).first();
}

module.exports = { insertProduct, findProducts, findProductByid, removeProduct, findProductsByCategory, updateProduct, findProductByDescription, findProductByDescriptionAndDifferentId };