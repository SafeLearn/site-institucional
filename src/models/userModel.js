const db = require("../infra/conexao");

function cadastrarUsuario(nome, email, senha, nivelAcesso) {
    const instrucao = `INSERT INTO usuario (userName, emailUsuario, senhaUsuario, fkNivelDeAcesso) VALUES (?, ?, ?, ?)`;
    return db.query(instrucao, [nome, email, senha, nivelAcesso]);
}

function obterUsuarios() {
    const instrucao = `SELECT * FROM usuario`;
    return db.query(instrucao);
}

function atualizarUsuario(id, nome, email, senha, nivelAcesso) {
    const instrucao = `UPDATE usuario SET userName = ?, emailUsuario = ?, senhaUsuario = ?, fkNivelDeAcesso = ? WHERE idUsuario = ?`;
    return db.query(instrucao, [nome, email, senha, nivelAcesso, id]);
}

function excluirUsuario(id) {
    const instrucao = `DELETE FROM usuario WHERE idUsuario = ?`;
    return db.query(instrucao, [id]);
}

module.exports = {
    cadastrarUsuario,
    obterUsuarios,
    atualizarUsuario,
    excluirUsuario
};
