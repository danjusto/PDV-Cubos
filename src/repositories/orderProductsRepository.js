const knex = require('../database/connection');

const insert = async (pedido_id, produto_id, quantidade_produto, valor_produto) => {
  return await knex('order_products').insert({ pedido_id, produto_id, quantidade_produto, valor_produto }).returning('*');
};

const findAllByOrderId = async (pedido_id) => {
  return await knex('order_products').where('pedido_id', pedido_id);
};

module.exports = { insert, findAllByOrderId };
