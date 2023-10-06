const knex = require('../database/connection');

const findProducts = async () => {
  return await knex('clients').select('*');
};

const findProductByid = async (id) => {
  return await knex('clients').where('id', id);
};

const removeProduct = async (id) => {
    return await knex('clients').where('id', id).del();
  };

module.exports = { findProducts, findProductByid, removeProduct };
