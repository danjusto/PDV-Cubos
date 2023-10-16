const { Router } = require('express');
const { createUser, updateUser, detailUser } = require('../controller/userController');
const validateBody = require('../middlewares/validateBody');
const validateToken = require('../middlewares/validateToken');
const { user: userSchema } = require('../schemas/user');

const routes = Router();

routes.post('/', validateBody(userSchema), createUser);
routes.put('/', validateToken, validateBody(userSchema), updateUser);
routes.get('/', validateToken, detailUser);

module.exports = routes;
