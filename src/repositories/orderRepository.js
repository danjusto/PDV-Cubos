const knex = require('../database/connection');

const insert = async (cliente_id, observacao, valor_total) => {
  return await knex('orders').insert({ cliente_id, observacao, valor_total }).returning('*');
};

const findAllOrders = async () => {
  return await knex('orders').select('id', 'valor_total', 'observacao', 'cliente_id');
};

const findAllOrdersById = async (client_id) => {
  return await knex('orders').select('id', 'valor_total', 'observacao', 'cliente_id').where('cliente_id', client_id);
};

const findAllOrderProducts = async (idOrder) => {
  return await knex('order_products').select('id', 'quantidade_produto', 'valor_produto', 'pedido_id', 'produto_id').where('pedido_id', idOrder);
};

module.exports = { insert, findAllOrders, findAllOrdersById, findAllOrderProducts };
