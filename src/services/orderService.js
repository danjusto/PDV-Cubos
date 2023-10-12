const AppError = require('../errors/AppError');
const {findById: findByIdClient} = require('../repositories/clientRepository.js');
const {findById: findByIdProduct} = require('../repositories/productRepository.js');
const {insert: insertOrder} = require('../repositories/orderRepository.js');
const {insert: insertOrderProducts} = require('../repositories/orderProductsRepository');

const executeCreate = async (cliente_id, observacao, produto_pedidos) => {
  const clientById = await findByIdClient(cliente_id);
  if (!clientById) {
    throw new AppError('Client not found.', 404);
  }
  
  let valor_total = 0
  
  for (let produto of produto_pedidos) {
    console.log(produto)
    const product = await findByIdProduct(produto.produto_id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
  
    if (produto.quantidade_produto > product.quantidade_estoque) {
      throw new AppError('Insufficient stock', 400);
    }
  
    valor_total += product.valor * produto.quantidade_produto
  }

  // produto_pedidos.forEach(async (produto) => {

  // });


  const newOrder = await insertOrder(cliente_id, observacao, valor_total);
  console.log(newOrder)
  const listOfProducts = []

  for (let produto of produto_pedidos) {
    const product = await findByIdProduct(produto.produto_id);
    const orderProducts = await insertOrderProducts(newOrder[0].id, product.id, produto.quantidade_produto, product.valor);
    listOfProducts.push(orderProducts[0]);
  }

  // produto_pedidos.forEach(async (produto, ) => {
  // })

  return {
    order: newOrder[0],
    orderProducts: listOfProducts
}
}

module.exports = executeCreate