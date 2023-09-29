const { Router } = require('express');
const { createUser, detailUser } = require('../controller/userController');
const validateUserBody = require('../middlewares/validateUserBody');
const userSchema = require('../schemas/user');

const routes = Router();

routes.post('/', validateUserBody(userSchema), createUser);
routes.get('/', detailUser);

module.exports = routes;
