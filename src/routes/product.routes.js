const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateParam = require('../middlewares/validateParam');
const validateBody = require('../middlewares/validateBody');
const validateQueryParam = require('../middlewares/validateQueryParam');
const { createProduct, listProducts, detailProduct, removeProduct, updateProduct } = require('../controller/productController');
const productSchema = require('../schemas/product');
const idParamSchema = require('../schemas/idParam');
const idQueryParamSchema = require('../schemas/idQueryParam');
const multer = require('../middlewares/multer');

const routes = Router();

routes.use(validateToken);

routes.post('/', multer.single('file'), validateBody(productSchema), createProduct);
routes.get('/', validateQueryParam(idQueryParamSchema), listProducts);
routes.get('/:id', validateParam(idParamSchema), detailProduct);
routes.put('/:id', multer.single('file'), validateBody(productSchema), updateProduct);
routes.delete('/:id', validateParam(idParamSchema), removeProduct);

module.exports = routes;
