const knex = require('../database/connection');

const findClients = async () => {
  return await knex('clients').returning('*');
};

module.exports = { findClients };
