const { Router } = require('express');
const { loginUser } = require('../controller/userController');
const validateUserBody = require('../middlewares/validateUserBody');
const { loginUser: login } = require('../schemas/user');

const routes = Router();

routes.post('/', validateUserBody(login), loginUser);

module.exports = routes;