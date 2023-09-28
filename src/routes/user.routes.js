const { Router } = require('express');
const { createUser, updateUser } = require('../controller/userController');
const routes = Router();

routes.post('/', createUser);



routes.put('/', updateUser);

module.exports = routes;
