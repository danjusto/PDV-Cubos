const { Router } = require('express');
const { createUser, updateUser, detailUser } = require('../controller/userController');

const validateBody = require('../middlewares/validateBody');
const validateToken = require('../middlewares/validateToken')
const { user } = require('../schemas/user');

const routes = Router();

routes.post('/', validateBody(user), createUser);
routes.put('/', validateToken, validateBody(user), updateUser);
routes.get('/', validateToken, detailUser);

module.exports = routes;
