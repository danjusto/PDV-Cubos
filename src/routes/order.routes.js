const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateBody = require('../middlewares/validateBody');
const {createOrder} = require('../controller/orderController.js')
const orderSchema = require('../schemas/order.js');
const routes = Router();

routes.use(validateToken);

routes.post('/', validateBody(orderSchema), createOrder);

module.exports = routes