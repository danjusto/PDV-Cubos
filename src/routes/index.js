const { Router } = require('express');

const userRoutes = require('./user.routes');

const routes = Router();

routes.use('/usuario', userRoutes);

module.exports = routes;
