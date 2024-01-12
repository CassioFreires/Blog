import mongoose from 'mongoose'

const conexao = async () => {
    console.log("await connecting to the banco de dados");
    return await mongoose.connect(process.env.MONGODB_URI)
}

export default conexao;