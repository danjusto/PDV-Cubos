const { findAllOrders, findAllOrdersById, findAllOrderProducts } = require('../repositories/orderRepository');

const executeList = async () => {
  const listOrders = await findAllOrders();
  const listOrdersProducts = [];

  for (const order of listOrders) {
    const listProductsByOrder = await findAllOrderProducts(order.id);
    listOrdersProducts.push({
      pedido: order,
      pedido_produtos: listProductsByOrder,
    });
  }

  return listOrdersProducts;
};

const executeListById = async (id) => {
  const listOrdersById = await findAllOrdersById(id);
  const listOrdersProducts = [];

  for (const order of listOrdersById) {
    const listProductsByOrder = await findAllOrderProducts(order.id);
    listOrdersProducts.push({
      pedido: order,
      pedido_produtos: listProductsByOrder,
    });
  }

  return listOrdersProducts;
};

module.exports = {
  executeList,
  executeListById,
};
