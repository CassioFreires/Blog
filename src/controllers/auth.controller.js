import bcryptjs from 'bcryptjs';
import {loginService, generatorToken} from '../services/auth.service.js';

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        
        // buscando dados na base
        const user = await loginService(email);
        
        if(!user) {
            return res.status(400).send({message: 'user or password not found'})
        }

        const passwordIsValid =  bcryptjs.compareSync(password, user.password)
        
        if(!passwordIsValid) {
            return res.status(400).send({message: 'user or password not found'})
        }

        const token =  generatorToken(user.id)

        res.send(token)

        
    }catch(e) {
        res.status(500).send(e.meesage)
    }
}

export default {
    login
}