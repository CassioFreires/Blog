import UserService from '../services/user.service.js';
import mongoose from 'mongoose';


const create = async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            password,
            avatar,
            background
        } = req.body;

        // verificando se não existe algum campo 
        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({
                message: 'Submit all fields for registration'
            })
        }

        // persistindo dados na base
        const user = await UserService.createService(req.body);
        if (!user) {
            return res.status(400).send({
                message: 'Error creating user',
                user: user
            })
        }

        // testando a API
        res.status(201).send({
            message: 'User created successfully',
            user: {
                id: user._id,
                name,
                username,
                email,
                password,
                avatar,
                background
            }
        })
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }

}

const findAll = async (req, res) => {
    try {
        const users = await UserService.findAllService();
        if (users.length === 0) {
            res.status(400).send({
                message: 'there is no registred users'
            })
        }
        res.send(users)
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }

}

const findById = async (req, res) => {
    try {
        const id = req.id;
        const user = req.user;
        res.send(user)
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

const updateOne = async (req, res) => {
    try {
        const id = req.id;
        const { name,username,email,password,avatar,background} = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).send('Submit at least one field for update ');
        }
        await UserService.updateOneService(id, name, username, email, avatar, background);
        res.send({ message: 'User successfully update one'});

    } catch(e) {
        res.status(500).send({ message: e.message})
    }

}


export default{
    create,
    findAll,
    findById,
    updateOne
}