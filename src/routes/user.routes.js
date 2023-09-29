const { Router } = require('express');
const { createUser, updateUser } = require('../controller/userController');
const validateUserBody = require('../middlewares/validateUserBody');
const userSchema = require('../schemas/user');

const routes = Router();

routes.post('/', validateUserBody(userSchema), createUser);
routes.put('/:id', validateUserBody(userSchema), updateUser);

module.exports = routes;
