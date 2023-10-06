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

const removeProduct = async (id) => {
  return await knex('products').where('id', id).del();
};

module.exports = { findProducts, findProductByid, removeProduct, findProductsByCategory };
