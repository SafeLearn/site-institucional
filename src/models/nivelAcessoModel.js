const { sql } = require("../infra/conexao");

async function cadastrarNivelAcesso(nivelDeAcesso) {
  const query = `INSERT INTO NivelDeAcesso (nivelDeAcesso) OUTPUT INSERTED.idNivelDeAcesso VALUES (@nivelDeAcesso)`;

  return new Promise((resolve, reject) => {
    sql
      .connect()
      .then((pool) => {
        return pool.request()
          .input("nivelDeAcesso", sql.VarChar, nivelDeAcesso)
          .query(query);
      })
      .then((result) => {
        if (result.rowsAffected[0] > 0) {
          resolve({ message: "Nível de acesso cadastrado com sucesso", idNivelDeAcesso: result.recordset[0].idNivelDeAcesso });
        } else {
          reject(new Error("Cadastro não realizado!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function listarNiveisAcesso() {
  const query = `SELECT idNivelDeAcesso, nivelDeAcesso FROM NivelDeAcesso`;

  return new Promise((resolve, reject) => {
    sql
      .connect()
      .then((pool) => {
        return pool.request().query(query);
      })
      .then((result) => {
        if (result.recordset.length > 0) {
          resolve(result.recordset);
        } else {
          reject(new Error("Nenhum nível de acesso encontrado!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function atualizarNivelAcesso(idNivelDeAcesso, nivelDeAcesso) {
  const query = `
    UPDATE NivelDeAcesso
    SET nivelDeAcesso = @nivelDeAcesso
    WHERE idNivelDeAcesso = @idNivelDeAcesso`;

  return new Promise((resolve, reject) => {
    sql.connect()
      .then((pool) => {
        return pool.request()
          .input('idNivelDeAcesso', sql.Int, idNivelDeAcesso)
          .input('nivelDeAcesso', sql.VarChar, nivelDeAcesso)
          .query(query);
      })
      .then((result) => {
        if (result.rowsAffected[0] > 0) {
          resolve({ message: 'Nível de acesso atualizado com sucesso' });
        } else {
          reject(new Error('Nível de acesso não encontrado ou não atualizado!'));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function excluirNivelAcesso(idNivelDeAcesso) {
  const query = `DELETE FROM NivelDeAcesso WHERE idNivelDeAcesso = @idNivelDeAcesso`;

  return new Promise((resolve, reject) => {
    sql
      .connect()
      .then((pool) => {
        return pool.request()
          .input("idNivelDeAcesso", sql.Int, idNivelDeAcesso)
          .query(query);
      })
      .then((result) => {
        if (result.rowsAffected[0] > 0) {
          resolve({ message: "Nível de acesso excluído com sucesso" });
        } else {
          reject(new Error("Nível de acesso não encontrado!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  cadastrarNivelAcesso,
  listarNiveisAcesso,
  atualizarNivelAcesso,
  excluirNivelAcesso,
};
