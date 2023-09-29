const { Router } = require('express');
const { listCategories } = require('../controller/categoryController');

const routes = Router();

routes.get('/', listCategories);

module.exports = routes;
