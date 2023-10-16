const AppError = require('../errors/AppError');
const sendEmail = require('../utils/sendEmail.js');
const { findById: findByIdClient } = require('../repositories/clientRepository.js');
const { findById: findByIdProduct, decrementStock } = require('../repositories/productRepository.js');
const { insert: insertOrder, findAll: findAllOrders, findAllByClientId: findAllOrdersByClientId } = require('../repositories/orderRepository.js');
const { insert: insertOrderProducts, findAllByOrderId: findAllOrderProducts } = require('../repositories/orderProductsRepository');

const executeCreate = async (cliente_id, observacao, produto_pedidos) => {
  const client = await findByIdClient(cliente_id);
  if (!client) {
    throw new AppError('Client not found.', 404);
  }
  const products = [];
  let totalValue = 0;
  for (let item of produto_pedidos) {
    const product = await findByIdProduct(item.produto_id);
    if (!product) {
      throw new AppError('Product not found.', 404);
    }
    if (item.quantidade_produto > product.quantidade_estoque) {
      throw new AppError('Insufficient stock.', 400);
    }
    totalValue += product.valor * item.quantidade_produto;
    products.push(product);
  }
  const newOrder = await insertOrder(cliente_id, observacao, totalValue);
  const listOrderProducts = [];
  for (let produto of produto_pedidos) {
    const index = produto_pedidos.indexOf(produto);
    const orderProducts = await insertOrderProducts(newOrder[0].id, products[index].id, produto.quantidade_produto, products[index].valor);
    listOrderProducts.push(orderProducts[0]);
    decrementStock(products[index].id, products[index].quantidade_estoque - produto.quantidade_produto);
  }
  sendEmail(client.nome, client.email, newOrder[0].id, totalValue / 100);
  return {
    pedido: newOrder[0],
    pedido_produtos: listOrderProducts,
  };
};

const executeList = async (cliente_id) => {
  let listOrders;
  cliente_id ? (listOrders = await findAllOrdersByClientId(cliente_id)) : (listOrders = await findAllOrders());
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

module.exports = { executeCreate, executeList };
