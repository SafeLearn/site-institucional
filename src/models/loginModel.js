const { sql } = require("../infra/conexao");

class LoginModel {
    buscar(dadosLogin) {
        const sqlQuery = `SELECT idUsuario, userName, senhaUsuario, nivelDeAcesso, fkinstituicao FROM usuario 
            INNER JOIN nivelDeAcesso ON fkNivelDeAcesso = idNivelDeAcesso
                WHERE userName = @userName AND senhaUsuario = @senhaUsuario;`;

        return new Promise((resolve, reject) => {
            sql.connect().then(pool => {
                return pool.request()
                    .input('userName', dadosLogin.loginUsuario)
                    .input('senhaUsuario', dadosLogin.loginSenha)
                    .query(sqlQuery);
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset[0]);
                } else {
                    reject(new Error("Usuário não encontrado ou senha inválida"));
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = new LoginModel();
