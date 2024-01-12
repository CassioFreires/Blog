import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert {type: 'json'}

const swaggerRouters = express.Router();

swaggerRouters.use('/', swaggerUi.serve);
swaggerRouters.get('/', swaggerUi.setup(swaggerDocument));


export default swaggerRouters;