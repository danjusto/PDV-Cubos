const { Router } = require('express');
//const validateUserBody = require('../middlewares/validateUserBody');
const validateToken = require('../middlewares/validateToken');
const { listClients, clientDetail } = require('../controller/clientController');

const routes = Router();

routes.get('/', validateToken, listClients);
routes.get('/:id', validateToken, clientDetail);

module.exports = routes;
