const AppError = require('../errors/AppError');
const { executeList, executeListById, executeCreate } = require('../services/orderService');

const createOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;
  try {
    const createOrder = await executeCreate(cliente_id, observacao, pedido_produtos);
    return res.status(201).json(createOrder);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

const listOrders = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    try {
      const orders = await executeList();
      if (!orders) throw new AppError('orders not found', 404);
      return res.status(200).json(orders);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Server error.' });
    }
  } else {
    try {
      const ordersClient = await executeListById(id);
      if (!ordersClient) throw new AppError('orders not found', 404);
      return res.status(200).json(ordersClient);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Server error.' });
    }
  }
};

module.exports = { createOrder, listOrders };
