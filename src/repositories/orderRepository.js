const knex = require('../database/connection');

const insert = async (cliente_id, observacao, valor_total) => {
  return await knex('orders').insert({ cliente_id, observacao, valor_total }).returning('*');
};

module.exports = {insert}