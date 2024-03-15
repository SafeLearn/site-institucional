const conexao = require("../infra/conexao");
class deletarModel {
    deletarUsuario(id) {
        const sql = "DELETE FROM teste WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });
        }); 
    }
    
    deletarInstituicao(id) {
        const sql = "DELETE FROM teste WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });
        }); 
    }
}

module.exports = new deletarModel();