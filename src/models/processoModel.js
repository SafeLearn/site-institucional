const { sql } = require("../infra/conexao");

class processoModel {
  maioresConsumosPorProcesso(idInstituicao) {
    const query = `SELECT TOP 5 nomeProcesso, consumoProcesso 
        FROM processo
        INNER JOIN maquina ON fkMaquina = idProcessador
        INNER JOIN instituicao ON fkInstituicao = idInstituicao
        WHERE idInstituicao = 1 
        AND dataHoraRegistroProcesso >= DATEADD(DAY, -7, GETDATE())
        ORDER BY consumoProcesso DESC;
        `;

    return new Promise((resolve, reject) => {
      sql
        .connect()
        .then((pool) => {
          return pool
            .request()
            .input("idInstituicao", sql.Int, idInstituicao)
            .query(query);
        })
        .then((result) => {
          if (result.recordset.length > 0) {
            resolve(result.recordset);
          } else {
            reject(new Error("Processos não encontrados"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  maioresProcessosUso(idInstituicao) {
    const query = `WITH ProcessosUltimos7Dias AS (
        SELECT 
            nomeProcesso,
            COUNT(*) AS usoTotal
        FROM 
            processo
        WHERE 
            dataHoraRegistroProcesso >= DATEADD(DAY, -7, GETDATE())
        GROUP BY 
            nomeProcesso
    )
    SELECT 
        nomeProcesso, 
        usoTotal
    FROM 
        ProcessosUltimos7Dias
    ORDER BY 
        usoTotal DESC
    OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;
        `;

    return new Promise((resolve, reject) => {
      sql
        .connect()
        .then((pool) => {
          return pool
            .request()
            .input("idInstituicao", sql.Int, idInstituicao)
            .query(query);
        })
        .then((result) => {
          if (result.recordset.length > 0) {
            resolve(result.recordset);
          } else {
            reject(new Error("Processos não encontrados"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  listarTodosProcessos(idInstituicao, idProcessador) {
    const query = `SELECT TOP 10 nomeProcesso, FORMAT(dataHoraRegistroProcesso, 'HH:mm:ss') AS hora FROM Processo p
        RIGHT JOIN maquina m ON p.fkMaquina = m.idProcessador
            RIGHT JOIN instituicao i ON m.fkInstituicao = i.idInstituicao
                WHERE p.fkMaquina = @idProcessador AND i.idInstituicao = @idInstituicao
                    ORDER BY idProcesso DESC`;

    return new Promise((resolve, reject) => {
      sql
        .connect()
        .then((pool) => {
          return pool
            .request()
            .input("idInstituicao", sql.Int, idInstituicao)
            .input("idProcessador", idProcessador)
            .query(query);
        })
        .then((result) => {
          if (result.recordset.length > 0) {
            resolve(result.recordset);
          } else {
            reject(new Error("Processos não encontrados"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = new processoModel();
