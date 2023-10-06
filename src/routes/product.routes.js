const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateParam = require('../middlewares/validateParam');
const validateQueryParam = require('../middlewares/validateQueryParam');
const { createProduct, listProducts, detailProduct, removeProduct } = require('../controller/productController');
const idParam = require('../schemas/idParam');
const idQueryParam = require('../schemas/idQueryParam');

const routes = Router();

routes.use(validateToken);

routes.post('/', createProduct);
routes.get('/', validateQueryParam(idQueryParam), listProducts);
routes.get('/:id', validateParam(idParam), detailProduct);
routes.delete('/:id', validateParam(idParam), removeProduct);

module.exports = routes;