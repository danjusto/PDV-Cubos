const AppError = require('../errors/AppError');
const sendEmail = require('../utils/sendEmail.js');
const { findById: findByIdClient } = require('../repositories/clientRepository.js');
const { findById: findByIdProduct } = require('../repositories/productRepository.js');
const { insert: insertOrder, findAllOrders, findAllOrdersById, findAllOrderProducts } = require('../repositories/orderRepository.js');
const { insert: insertOrderProducts } = require('../repositories/orderProductsRepository');

const executeCreate = async (cliente_id, observacao, produto_pedidos) => {
  const client = await findByIdClient(cliente_id);
  if (!client) {
    throw new AppError('Client not found.', 404);
  }

  let valor_total = 0;

  for (let produto of produto_pedidos) {
    console.log(produto);
    const product = await findByIdProduct(produto.produto_id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (produto.quantidade_produto > product.quantidade_estoque) {
      throw new AppError('Insufficient stock', 400);
    }

    valor_total += product.valor * produto.quantidade_produto;
  }

  const newOrder = await insertOrder(cliente_id, observacao, valor_total);
  console.log(newOrder);
  const listOfProducts = [];

  for (let produto of produto_pedidos) {
    const product = await findByIdProduct(produto.produto_id);
    const orderProducts = await insertOrderProducts(newOrder[0].id, product.id, produto.quantidade_produto, product.valor);
    listOfProducts.push(orderProducts[0]);
  }

  sendEmail(client.nome, client.email);

  return {
    order: newOrder[0],
    orderProducts: listOfProducts,
  };
};
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
  executeCreate,
  executeList,
  executeListById,
};