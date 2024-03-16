const conexao = require("../infra/conexao");
class loginModel {
    buscar(dadosLogin) {
        const sql = `SELECT id, nomePessoal, senhaPessoal FROM usuario WHERE nomePessoal = ? AND senhaPessoal = ?`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, [dadosLogin.loginUsuario, dadosLogin.loginSenha], (error, resposta) => {
                if(error) {
                    reject(error);
                } else {
                    if (resposta.length > 0) {
                        resolve(resposta[0]);
                    } else {
                        reject(new Error("Usuário não encontrado ou senha inválida"));
                    }
                }
            });  
        });
    }
}

module.exports = new loginModel();