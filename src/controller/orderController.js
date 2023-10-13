const { executeList, executeListById } = require('../services/orderService');
const AppError = require('../errors/AppError');

const listOrders = async (req, res) => {
  try {
    const orders = await executeList();
    if (!orders) throw new AppError('orders not found', 404);
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

const detailOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const ordersClient = await executeListById(id);
    if (!ordersClient) throw new AppError('orders not found', 404);
    res.status(200).json(ordersClient);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  listOrders,
  detailOrder,
};
