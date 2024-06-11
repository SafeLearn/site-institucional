const db = require("../infra/conexao");

function cadastrarUsuario(nome, email, senha, nivelAcesso) {
    const instrucao = `INSERT INTO usuario (userName, emailUsuario, senhaUsuario, fkNivelDeAcesso) VALUES ('${nome}', '${email}', '${senha}', '${nivelAcesso}')`;
    return db.executar(instrucao);
}

module.exports = {
    cadastrarUsuario
};
