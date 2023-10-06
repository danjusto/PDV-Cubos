const { Router } = require('express');
const { loginUser } = require('../controller/userController');
const validateBody = require('../middlewares/validateBody');
const { loginUser: login } = require('../schemas/user');

const routes = Router();

routes.post('/', validateBody(login), loginUser);

module.exports = routes;