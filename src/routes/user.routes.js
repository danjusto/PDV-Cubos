const { Router } = require('express');
const { createUser } = require('../controller/userController');
const validateUserBody = require('../middlewares/validateUserBody');
const userSchema = require('../schemas/user');

const routes = Router();

routes.post('/', validateUserBody(userSchema), createUser);

module.exports = routes;
