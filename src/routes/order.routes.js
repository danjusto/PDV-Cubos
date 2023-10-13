const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateBody = require('../middlewares/validateBody');
const orderSchema = require('../schemas/order.js');
const { createOrder, listOrders } = require('../controller/orderController');

const routes = Router();

routes.use(validateToken);

routes.post('/', validateBody(orderSchema), createOrder);
routes.get('/', listOrders);

module.exports = routes;
