const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { listProducts, detailProduct, removeProduct } = require('../controller/productController');

const routes = Router();

routes.use(validateToken);

routes.get('/', listProducts);
routes.get('/:id', detailProduct);
routes.delete('/:id', removeProduct);

module.exports = routes;
