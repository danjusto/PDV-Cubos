const { Router } = require('express');
const { createProduct } = require('../controller/productController');

const routes = Router();

routes.post('/', createProduct);

module.exports = routes;