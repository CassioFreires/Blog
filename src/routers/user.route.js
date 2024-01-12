
import express from 'express';
import userController from '../controllers/user.controller.js'
import {validId, validUser} from '../middlewares/global.middlewares.js';



const usersRouters = express.Router();




usersRouters.post('/', userController.create);
usersRouters.get('/', userController.findAll);
usersRouters.get('/:id', validId, validUser, userController.findById);
usersRouters.patch('/:id', validId, validUser, userController.updateOne);


export default  usersRouters;