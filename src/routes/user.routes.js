const { Router } = require('express');
const { createUser, loginUser } = require('../controller/userController');
const routes = Router();

routes.post('/', createUser);
routes.post('/', loginUser);

module.exports = routes;
