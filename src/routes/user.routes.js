const { Router } = require('express');
const { createUser, updateUser, detailUser } = require('../controller/userController');
const validateUserBody = require('../middlewares/validateUserBody');
const validateToken = require('../middlewares/validateToken')
const { user } = require('../schemas/user');

const routes = Router();

routes.post('/', validateUserBody(user), createUser);
routes.put('/', validateToken, validateUserBody(user), updateUser);
routes.get('/', validateToken, detailUser);

module.exports = routes;
