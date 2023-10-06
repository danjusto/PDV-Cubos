const knex = require('../database/connection');

const findClients = async () => {
  return await knex('clients').select('*');
};

const findClientByid = async (id) => {
  return await knex('clients').where('id', id).first();
};

module.exports = { findClients, findClientByid };
