const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json')


const swaggerRouters = express.Router();

swaggerRouters.use('/', swaggerUi.serve);
swaggerRouters.get('/', swaggerUi.setup(swaggerDocument));


module.exports = swaggerRouters;