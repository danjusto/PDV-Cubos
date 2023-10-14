const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const validateParam = require('../middlewares/validateParam');
const validateBody = require('../middlewares/validateBody');
const validateQueryParam = require('../middlewares/validateQueryParam');
const productSchema = require('../schemas/product');
const idParamSchema = require('../schemas/idParam');
const { categoriaIdQueryParam } = require('../schemas/idQueryParam');
const { createProduct, listProducts, detailProduct, removeProduct, updateProduct } = require('../controller/productController');
const multer = require('multer');

const routes = Router();
const upload = multer({});

routes.use(validateToken);

routes.post('/', upload.single('file'), validateBody(productSchema), createProduct);
routes.get('/', validateQueryParam(categoriaIdQueryParam), listProducts);

routes.use(validateParam(idParamSchema));
routes.put('/:id', upload.single('file'), validateBody(productSchema), updateProduct);
routes.get('/:id', detailProduct);
routes.delete('/:id', removeProduct);

module.exports = routes;
