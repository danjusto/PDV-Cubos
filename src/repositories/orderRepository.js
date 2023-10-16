const knex = require('../database/connection');

const insert = async (cliente_id, observacao, valor_total) => {
  return await knex('orders').insert({ cliente_id, observacao, valor_total }).returning('*');
};

const findAll = async () => {
  return await knex('orders');
};

const findAllByClientId = async (client_id) => {
  return await knex('orders').where('cliente_id', client_id);
};

module.exports = { insert, findAll, findAllByClientId };
