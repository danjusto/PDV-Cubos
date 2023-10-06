const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateParam = require('../middlewares/validateParam');
const validateBody = require('../middlewares/validateBody')
const validateQueryParam = require('../middlewares/validateQueryParam');
const { createProduct, listProducts, detailProduct, removeProduct, updateProduct } = require('../controller/productController');
const product = require('../schemas/product')
const idParam = require('../schemas/idParam');
const idQueryParam = require('../schemas/idQueryParam');

const routes = Router();

routes.use(validateToken);

routes.post('/', validateBody(product), createProduct);
routes.get('/', validateQueryParam(idQueryParam), listProducts);
routes.get('/:id', validateParam(idParam), detailProduct);
routes.put('/:id', validateParam(idParam), validateBody(product), updateProduct);
routes.delete('/:id', validateParam(idParam), removeProduct);

module.exports = routes;