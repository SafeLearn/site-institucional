const conexao = require("../infra/conexao");
class loginModel {
    buscar(dadosLogin) {
        const sql = `SELECT idUsuario, userName, senhaUsuario, nivelDeAcesso FROM usuario
        RIGHT JOIN nivelDeAcesso ON usuario.fkNivelDeAcesso = niveldeacesso.idNivelDeAcesso WHERE userName = ? AND senhaUsuario = ?`;
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