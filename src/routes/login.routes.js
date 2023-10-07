const { Router } = require('express');
const { loginUser } = require('../controller/userController');
const validateBody = require('../middlewares/validateBody');
const { loginUser: loginSchema } = require('../schemas/user');

const routes = Router();

routes.post('/', validateBody(loginSchema), loginUser);

module.exports = routes;
