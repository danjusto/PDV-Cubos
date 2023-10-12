const AppError = require('../errors/AppError');
const executeCreate = require('../services/orderService');

const createOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;
  try {
    const createOrder = await executeCreate(cliente_id, observacao, pedido_produtos)
    return res.status(201).json(createOrder);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error)
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {createOrder}