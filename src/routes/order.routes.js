const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateBody = require('../middlewares/validateBody');
const validateQueryParam = require('../middlewares/validateQueryParam');
const orderSchema = require('../schemas/order.js');
const { clienteIdQueryParam } = require('../schemas/idQueryParam');
const { createOrder, listOrders } = require('../controller/orderController');

const routes = Router();

routes.use(validateToken);

routes.post('/', validateBody(orderSchema), createOrder);
routes.get('/', validateQueryParam(clienteIdQueryParam), listOrders);

module.exports = routes;
