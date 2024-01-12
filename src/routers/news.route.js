import express from 'express';
import Controller from '../controllers/news.controller.js';
import { authMidlewares } from '../middlewares/auth.middlewares.js';

const newsRouters = express.Router();


newsRouters.post('/', authMidlewares, Controller.create);
newsRouters.get('/', Controller.getAll);
newsRouters.get('/top', Controller.topNews);
newsRouters.get('/search', Controller.searchByTile);
newsRouters.get('/byUser', authMidlewares, Controller.byUser);
newsRouters.get('/:id',authMidlewares, Controller.findById);

newsRouters.patch('/update/:id', authMidlewares, Controller.update);
newsRouters.delete('/delete/:id', authMidlewares, Controller.exclude);

newsRouters.patch('/like/:id', authMidlewares, Controller.likeNews);

newsRouters.patch('/comment/:id', authMidlewares, Controller.comments);
newsRouters.patch('/comment/delete/:idNews/:idComment', authMidlewares, Controller.deleteComment);











export default newsRouters;