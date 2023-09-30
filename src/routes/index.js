const { Router } = require('express');
const loginRoutes = require('./login.routes')
const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');

const routes = Router();

routes.use('/usuario', userRoutes);
routes.use('/categoria', categoryRoutes);
routes.use('/login', loginRoutes);

module.exports = routes;
