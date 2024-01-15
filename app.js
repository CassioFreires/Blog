import express from 'express';
import cors from 'cors';
import router from './src/routers/index.router.js';
import dotenv from 'dotenv';
import connectDataBase from './server.js';


const app = express();

// config gerenciand do dotenv
dotenv.config();

// config express para compreender documentos json
app.use(express.json());

// config cors the politicy
app.use(cors())

app.use(router)

// conexão com o banco de dados e servidor http
connectDataBase();

export default app;