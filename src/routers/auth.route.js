import express from 'express';
import loginController from '../controllers/auth.controller.js'
const loginRouters = express.Router();

loginRouters.post('/', loginController.login)


export default loginRouters;