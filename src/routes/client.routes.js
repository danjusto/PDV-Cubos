const { Router } = require('express');
const { createClient } = require('../controller/clientController');

const routes = Router();

routes.post('/', createClient);

module.exports = routes;
