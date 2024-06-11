const { query } = require("express");
const { sql } = require("../infra/conexao");

async function cadastrarUsuario(
  nome,
  email,
  senha,
  nivelAcesso,
  idInstituicao
) {
  const query = `
            INSERT INTO usuario (userName, emailUsuario, senhaUsuario, fkNivelDeAcesso, fkInstituicao) 
            OUTPUT INSERTED.idUsuario
            VALUES (@nome, @email, @senha, @nivelAcesso, @idInstituicao)`;

  return new Promise((resolve, reject) => {
    sql
      .connect()
      .then((pool) => {
        return pool
          .request()
          .input("nome", sql.VarChar, nome)
          .input("email", sql.VarChar, email)
          .input("senha", sql.VarChar, senha)
          .input("nivelAcesso", sql.Int, nivelAcesso)
          .input("idInstituicao", sql.Int, idInstituicao)
          .query(query);
      })
      .then((result) => {
        if (result.rowsAffected[0] > 0) {
          resolve({ message: "Cadastro realizado com sucesso" });
        } else {
          reject(new Error("Cadastro não realizado!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function listarUsuarios(idInstituicao, idUsuario) {
  const query = `SELECT idUsuario, userName, emailUsuario, fkNivelDeAcesso FROM usuario WHERE fkInstituicao = @idInstituicao AND idUsuario != @idUsuario`;

  return new Promise((resolve, reject) => {
    sql
      .connect()
      .then((pool) => {
        return pool
          .request()
          .input("idInstituicao", sql.Int, idInstituicao)
          .input("idUsuario", sql.Int, idUsuario)
          .query(query);
      })
      .then((result) => {
        if (result.recordset.length > 0) {
          resolve(result.recordset);
        } else {
          reject(new Error("Cadastro não realizado!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function atualizarUsuario(idUsuario, nome, email, senha, nivelAcesso, idInstituicao) {
    const query = `
      UPDATE usuario
      SET userName = @nome,
          emailUsuario = @email,
          senhaUsuario = @senha,
          fkNivelDeAcesso = @nivelAcesso,
          fkInstituicao = @idInstituicao
      WHERE idUsuario = @idUsuario`;
  
    return new Promise((resolve, reject) => {
      sql.connect()
        .then((pool) => {
          return pool.request()
            .input('idUsuario', sql.Int, idUsuario)
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('senha', sql.VarChar, senha)
            .input('nivelAcesso', sql.Int, nivelAcesso)
            .input('idInstituicao', sql.Int, idInstituicao)
            .query(query);
        })
        .then((result) => {
            if (result && result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] > 0) {
                resolve({ message: 'Usuário atualizado com sucesso' });
              } else {
                reject(new Error('Usuário não encontrado ou não atualizado!'));
              }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

async function excluirUsuario(idUsuario, idInstituicao) {
  const query = `DELETE FROM usuario WHERE idUsuario = @idUsuario AND fkInstituicao = @idInstituicao`;

  return new Promise((resolve, reject) => {
    sql
      .connect()
      .then((pool) => {
        return pool
          .request()
          .input("idUsuario", sql.Int, idUsuario)
          .input("idInstituicao", sql.Int, idInstituicao)
          .query(query);
      })
      .then((result) => {
        if (result.rowsAffected > 0) {
          resolve({ message: "Usuário deletado com sucesso" });
        } else {
          reject(new Error("Comando não realizado!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  cadastrarUsuario,
  listarUsuarios,
  atualizarUsuario,
  excluirUsuario,
};
