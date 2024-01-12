
import express from 'express';
import userController from '../controllers/user.controller.js'
import {validId, validUser} from '../middlewares/global.middlewares.js';
import { authMidlewares } from '../middlewares/auth.middlewares.js';



const usersRouters = express.Router();




usersRouters.post('/', userController.create);
usersRouters.get('/', authMidlewares, userController.findAll);
usersRouters.get('/:id', authMidlewares, validId, validUser, userController.findById);
usersRouters.patch('/:id', authMidlewares, validId, validUser, userController.updateOne);


export default  usersRouters;