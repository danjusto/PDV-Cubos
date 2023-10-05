const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { listClients, clientDetail } = require('../controller/clientController');

const routes = Router();

routes.use(validateToken);

//
//
routes.get('/', listClients);
routes.get('/:id', clientDetail);

module.exports = routes;
