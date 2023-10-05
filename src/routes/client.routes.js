const { Router } = require('express');
const { createClient, updateClient } = require('../controller/clientController');
const validateToken = require('../middlewares/validateToken');
const  validateClientBody = require('../middlewares/validateClientBody');
const { client } = require('../schemas/client');
const routes = Router();

routes.use(validateToken);
routes.post('/', validateClientBody(client), createClient);
routes.put('/:id', validateClientBody(client), updateClient);


module.exports = routes;
