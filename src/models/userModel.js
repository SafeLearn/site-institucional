const sql = require("../infra/conexao");

async function cadastrarUsuario(nome, email, senha, nivelAcesso) {
    try {
        const result = await sql.query`INSERT INTO usuario (userName, emailUsuario, senhaUsuario, fkNivelDeAcesso) VALUES (${nome}, ${email}, ${senha}, ${nivelAcesso})`;
        return result.recordset[0].idUsuario; // Assumindo que você está retornando o ID do usuário inserido
    } catch (err) {
        console.error("Erro ao cadastrar usuário: ", err);
        throw err;
    }
}

async function obterUsuarios() {
    try {
        const result = await sql.query`SELECT * FROM usuario`;
        return result.recordset;
    } catch (err) {
        console.error("Erro ao obter usuários: ", err);
        throw err;
    }
}

async function atualizarUsuario(id, nome, email, senha, nivelAcesso) {
    try {
        await sql.query`UPDATE usuario SET userName = ${nome}, emailUsuario = ${email}, senhaUsuario = ${senha}, fkNivelDeAcesso = ${nivelAcesso} WHERE idUsuario = ${id}`;
    } catch (err) {
        console.error("Erro ao atualizar usuário: ", err);
        throw err;
    }
}

async function excluirUsuario(id) {
    try {
        await sql.query`DELETE FROM usuario WHERE idUsuario = ${id}`;
    } catch (err) {
        console.error("Erro ao excluir usuário: ", err);
        throw err;
    }
}

module.exports = {
    cadastrarUsuario,
    obterUsuarios,
    atualizarUsuario,
    excluirUsuario
};
