const conexao = require("../infra/conexao");
class userModel {
    buscar() {
        const sql = "SELECT * FROM teste;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, {}, (error, resposta) => {
                if(error) {
                    console.log("Erro no select");
                    reject(error);
                }
                console.log("Deu certo buscar os usuários");
                resolve(resposta);
            });  
        });
    }

    criar(novoUsuario) {
        console.log(novoUsuario);
        const sql = "INSERT INTO teste (nome) VALUES (?)";
        const values = [novoUsuario.nome];
        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (error, resposta) => {
                if(error) {
                    console.log("Erro ao criar usuário");
                    reject(error);
                }
                console.log("Deu certo criar o usuário");
                resolve(resposta);
            });
        }); 
    }

    atualizar(usuarioAtualizado, id) {
        const sql = "UPDATE teste SET ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [usuarioAtualizado, id], (error, resposta) => {
                if(error) {
                    console.log("Erro ao atualizar usuário");
                    reject(error);
                }
                console.log("Deu certo atualizar o usuário");
                resolve(resposta);
            });
        }); 
    }

    deletar(id) {
        const sql = "DELETE FROM teste WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (error, resposta) => {
                if(error) {
                    console.log("Erro ao deletar usuário");
                    reject(error);
                }
                console.log("Deu certo deletar o usuário");
                resolve(resposta);
            });
        }); 
    }
}

module.exports = new userModel();