const { executeList } = require('../services/orderService');
const AppError = require('../errors/AppError');




const listOrders = async (req, res) => {
  try {
  const orders = await executeList();
  if(!orders) throw new AppError('orders not found', 404);
  res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
};


/* return res.status(200).json({mensage: 'listOrders ta on'}); */

module.exports = {
  listOrders
}
