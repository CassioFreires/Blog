import app from "./app.js";
import conexao from "./src/database/db.js";

const port =  process.env.PORT || 8081;

function connectDataBase() {
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
}

export default connectDataBase;