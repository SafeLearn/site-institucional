const conexao = require("../infra/conexao");
class loginModel {
    buscar() {
        const sql = "SELECT * FROM instituicao;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, {}, (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });  
        });
    }
}

module.exports = new loginModel();