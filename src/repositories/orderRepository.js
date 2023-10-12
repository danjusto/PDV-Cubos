const knex = require('../database/connection');

const findAllOrders = async () => {
  return await knex('orders').select(
    'id', 'valor_total', 'observacao', 'cliente_id');
};

const findAllOrderProducts = async (idOrder) => {
  return await knex('order_products').select(
    'id','quantidade_produto', 'valor_produto',
    'pedido_id', 'produto_id').where('pedido_id', idOrder);
};




module.exports = {
  findAllOrders,
  findAllOrderProducts
}
