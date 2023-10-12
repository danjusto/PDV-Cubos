const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateIdParam = require('../middlewares/validateParam');
const idParamSchema = require('../schemas/idParam');
const { listOrders, detailOrder } = require('../controller/orderController');
const routes = Router();

routes.use(validateToken);

routes.get('/', listOrders);
routes.get('/:id', validateIdParam(idParamSchema), detailOrder);

module.exports = routes;
