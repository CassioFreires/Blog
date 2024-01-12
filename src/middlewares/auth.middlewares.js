import dontenv from 'dotenv';
import UserService from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
dontenv.config();



export const authMidlewares = (req, res, next) => {
    try {
        const {
            authorization
        } = req.headers;


        if(authorization == undefined) {
            return res.status(401).send({message: 'Unauthorized'})
        }

        const parts = authorization.split(' ');


        if (parts.length !== 2) {
            return res.status(401).send({message: 'Unauthorized'});
        }


        const [schema, token] = parts;

        if (schema !== 'Bearer') {
            return res.status(401).send({message: 'Unauthorized'});
        }


        jwt.verify(token, process.env.SECRET_JWT, async (error, decode) => {
            if (error) {
                return res.status(401).send({
                    message: 'Token invalid'
                })
            }

            const user = await UserService.findByIdService(decode.id);

            if (!user || !user._id) {
                return res.status(401).send({
                    message: 'Token invalid'
                })
            }

            req.userId = user._id;
            return next()
        });


    } catch (e) {
        res.status(500).send(e.message)
    }

}