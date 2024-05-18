const conexao = require("../infra/conexao");

class deletarModel {
    deletarUsuario(id) {
        const sql = "DELETE FROM usuario WHERE idUsuario = @id";
        return new Promise((resolve, reject) => {
            conexao.query(sql, { id: id }, (error, resposta) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(resposta);
                }
            });
        }); 
    }
    
    deletarInstituicao(id) {
        const sql = "DELETE FROM instituicao WHERE idInstituicao = @id";
        return new Promise((resolve, reject) => {
            conexao.query(sql, { id: id }, (error, resposta) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(resposta);
                }
            });
        }); 
    }
}

module.exports = new deletarModel();
