import express from 'express';
const router = express.Router();


import usersRouters from "./user.route.js";
import loginRouters from "./auth.route.js";
import newsRouters from "./news.route.js";
import swaggerRouters from "./swagger.route.cjs";

// config rotas
router.use('/user', usersRouters);
router.use('/auth', loginRouters);
router.use('/news', newsRouters);
router.use('/doc', swaggerRouters);


export default router;