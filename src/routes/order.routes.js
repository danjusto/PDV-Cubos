const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateIdParam = require('../middlewares/validateParam');
const idParamSchema = require('../schemas/idParam');
const { listOrders } = require('../controller/orderController');
const routes = Router();

routes.use(validateToken);

routes.get('/', listOrders);
routes.get('/:id', validateIdParam(idParamSchema), (req, res) => {
  return res.status(200).json({mensage: 'Order for Id ta on'});
} /* ,detailOrder */);


module.exports = routes
