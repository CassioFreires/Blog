import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';    

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    avatar: {
        type: String,
        require: true
    },
    background: {
        type: String,
        require: true
    }
})

userSchema.pre('save', async function(next) {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
})

const User = mongoose.model('User', userSchema);

export default User;