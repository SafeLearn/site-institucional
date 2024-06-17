const { sql } = require("../infra/conexao");

async function cadastrarNomeMaquina(nomeMaquina) {
  const query = `INSERT INTO NomeMaquina (nomeMaquina) OUTPUT INSERTED.idNomeMaquina VALUES (@nomeMaquina)`;

  return new Promise((resolve, reject) => {
    sql
      .connect()
      .then((pool) => {
        return pool.request()
          .input("nomeMaquina", sql.VarChar, nomeMaquina)
          .query(query);
      })
      .then((result) => {
        if (result.rowsAffected[0] > 0) {
          resolve({ message: "Nome da máquina cadastrado com sucesso", idNomeMaquina: result.recordset[0].idNomeMaquina });
        } else {
          reject(new Error("Cadastro não realizado!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function listarNomesMaquina() {
  const query = `SELECT idNomeMaquina, nomeMaquina FROM NomeMaquina`;

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
          reject(new Error("Nenhum nome de máquina encontrado!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function atualizarNomeMaquina(idNomeMaquina, nomeMaquina) {
  const query = `
    UPDATE NomeMaquina
    SET nomeMaquina = @nomeMaquina
    WHERE idNomeMaquina = @idNomeMaquina`;

  return new Promise((resolve, reject) => {
    sql.connect()
      .then((pool) => {
        return pool.request()
          .input('idNomeMaquina', sql.Int, idNomeMaquina)
          .input('nomeMaquina', sql.VarChar, nomeMaquina)
          .query(query);
      })
      .then((result) => {
        if (result.rowsAffected[0] > 0) {
          resolve({ message: 'Nome da máquina atualizado com sucesso' });
        } else {
          reject(new Error('Nome da máquina não encontrado ou não atualizado!'));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function excluirNomeMaquina(idNomeMaquina) {
  const query = `DELETE FROM NomeMaquina WHERE idNomeMaquina = @idNomeMaquina`;

  return new Promise((resolve, reject) => {
    sql
      .connect()
      .then((pool) => {
        return pool.request()
          .input("idNomeMaquina", sql.Int, idNomeMaquina)
          .query(query);
      })
      .then((result) => {
        if (result.rowsAffected[0] > 0) {
          resolve({ message: "Nome da máquina excluído com sucesso" });
        } else {
          reject(new Error("Nome da máquina não encontrado!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  cadastrarNomeMaquina,
  listarNomesMaquina,
  atualizarNomeMaquina,
  excluirNomeMaquina,
};
