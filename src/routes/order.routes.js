const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateIdParam = require('../middlewares/validateParam');
const idParamSchema = require('../schemas/idParam');
const { listOrders } = require('../controller/orderController');
const routes = Router();

routes.use(validateToken);

routes.get('/', listOrders);

module.exports = routes;
