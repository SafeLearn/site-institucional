const conexao = require("../infra/conexao");
class cadastroModel {
    buscar() {
        const sql = "SELECT * FROM teste;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, {}, (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });  
        });
    }

    cadastrarUsuario(novoUsuario) {
        const sql = "INSERT INTO teste (nome) VALUES (?)";
        const values = [novoUsuario.nome];
        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });
        }); 
    }

    cadastrarInstituicao(novaInstituicao) {
        const sql = "INSERT INTO teste (nome) VALUES (?)";
        const values = [novaInstituicao.nome];
        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });
        }); 
    }
}

module.exports = new cadastroModel();