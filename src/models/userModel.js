const conexao = require("../infra/conexao");

class userModel {
    buscar() {
        const sql = "SELECT * FROM usuario;";
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
        const sql = "INSERT INTO usuario (nome) VALUES (@nome)";
        const values = { nome: novoUsuario.nome };
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
        const sql = "UPDATE usuario SET nome = @nome WHERE idUsuario = @id";
        const values = { nome: usuarioAtualizado.nome, id: id };
        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (error, resposta) => {
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
        const sql = "DELETE FROM usuario WHERE idUsuario = @id";
        const values = { id: id };
        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (error, resposta) => {
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
