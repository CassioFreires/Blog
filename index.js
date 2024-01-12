import express from 'express';

import usersRouters from './src/routers/user.route.js';
import loginRouters from './src/routers/auth.route.js';
import newsRouters from './src/routers/news.route.js';
import swaggerRouters from './src/routers/swagger.route.js';

import conexao from './src/database/db.js';
import dotenv from 'dotenv';
const app = express();
const port =  process.env.PORT || 8081;


// config gerenciand do dotenv
dotenv.config();

// config express para compreender documentos json
app.use(express.json());


// config rotas
app.use('/user', usersRouters);
app.use('/auth', loginRouters);
app.use('/news', newsRouters);
app.use('/doc', swaggerRouters);



// conexão com o banco de dados e servidor http
conexao()
    .then(() => {
        console.log('Mongodb Atlas conected successfully');

        app.listen(port, () => {
            console.log('Servidor http rodando na porta: ' + port);
        });
    })
    .catch((e) => {
        console.log('Failed to try Mongodb Atlas');
        console.log(e);
    })