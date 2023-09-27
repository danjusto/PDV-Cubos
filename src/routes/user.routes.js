const { Router } = require('express');
const { createUser } = require('../controller/userController');
const routes = Router();

routes.post('/', createUser);

module.exports = routes;
