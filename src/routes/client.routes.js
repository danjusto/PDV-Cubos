const { Router } = require('express');
const { createClient, updateClient, listClients, detailClient } = require('../controller/clientController');
const validateToken = require('../middlewares/validateToken');
const validateBody = require('../middlewares/validateBody');
const validateIdParam = require('../middlewares/validateParam');
const clientSchema = require('../schemas/client');
const idParamSchema = require('../schemas/idParam');
const routes = Router();

routes.use(validateToken);

routes.post('/', validateBody(clientSchema), createClient);
routes.get('/', listClients);
routes.get('/:id', validateIdParam(idParamSchema), detailClient);
routes.put('/:id', validateIdParam(idParamSchema), validateBody(clientSchema), updateClient);

module.exports = routes;
