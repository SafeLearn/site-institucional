class loginModel {
    buscar(dadosLogin) {
        const sql = `SELECT idUsuario, userName, senhaUsuario FROM usuario WHERE userName = @userName AND senhaUsuario = @senhaUsuario`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, {
                userName: dadosLogin.loginUsuario,
                senhaUsuario: dadosLogin.loginSenha
            }, (error, resposta) => {
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
