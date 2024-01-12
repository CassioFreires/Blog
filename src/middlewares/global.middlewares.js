import mongoose from 'mongoose';
import UserService from '../services/user.service.js';


// valida o id
const validId = (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send('Invalid ID');
        }
        req.id = id;
        next();
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

// validar user
const validUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await UserService.findByIdService(id);

        if (!user) {
            res.status(400).send({
                message: 'User not found'
            });
        }

        req.id = id;
        req.user = user;

        next();
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

export {
    validId,
    validUser
}