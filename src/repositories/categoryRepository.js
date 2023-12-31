const knex = require('../database/connection');

const findAll = async () => {
  return await knex('categories').orderBy('id');
};

const findById = async (id) => {
  return await knex('categories').where('id', id).first();
};

module.exports = { findAll, findById };
