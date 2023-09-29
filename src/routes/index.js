const { Router } = require('express');

const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');

const routes = Router();

routes.use('/usuario', userRoutes);
routes.use('/categoria', categoryRoutes);

module.exports = routes;
