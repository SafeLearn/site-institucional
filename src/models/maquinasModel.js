const { query } = require("express");
const { sql } = require("../infra/conexao");

class maquinasModel {
  buscarMaquinasPorInstituicao(idInstituicao) {
    const query = `SELECT idProcessador, nome, sistemaOperacional, status, tempoAtividade FROM maquina WHERE fkInstituicao = @idInstituicao;`;

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
            reject(new Error("Máquinas não encontradas"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  buscarBateria(idInstituicao) {
    const query = `SELECT m.idProcessador, m.nome, b.porcentagemBateria FROM Bateria b
    RIGHT JOIN maquina m ON m.idProcessador = b.fkMaquina
    RIGHT JOIN instituicao i ON i.idInstituicao = m.fkInstituicao
    WHERE idInstituicao = @idInstituicao`;

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
            reject(new Error("Máquinas não encontradas"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  buscarBateriaMaquina(idInstituicao, idProcessador) {
    const query = `
    SELECT TOP 1
        b.porcentagemBateria AS porcentagemBateria,
        b.statusEnergia AS statusEnergia,
        b.dataHoraRegistroBateria AS dataHoraRegistroBateria,
        m.idProcessador,
        m.nome,
        m.tempoAtividade
    FROM
      maquina m
    LEFT JOIN Bateria b ON m.idProcessador = b.fkMaquina
    JOIN instituicao i ON i.idInstituicao = m.fkInstituicao
    WHERE
        m.idProcessador = @idProcessador AND
        i.idInstituicao = @idInstituicao
    ORDER BY
        b.dataHoraRegistroBateria DESC;
    `;

    return new Promise((resolve, reject) => {
      sql
        .connect()
        .then((pool) => {
          return pool
            .request()
            .input("idProcessador", idProcessador)
            .input("idInstituicao", sql.Int, idInstituicao)
            .query(query);
        })
        .then((result) => {
          if (result.recordset.length > 0) {
            resolve(result.recordset);
          } else {
            reject(new Error("Máquinas não encontradas"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  porcentagemComponentes(idInstituicao) {
    const query = `WITH UltimoRegistro AS (
      SELECT
          r.fkComponente,
          r.fkMaquina,
          r.valorCaptura,
          ROW_NUMBER() OVER (PARTITION BY r.fkComponente, r.fkMaquina ORDER BY r.dataHoraRegistro DESC) AS rn
      FROM
          registro r
),
UltimaBateria AS (
      SELECT
          b.fkMaquina,
          b.porcentagemBateria,
          ROW_NUMBER() OVER (PARTITION BY b.fkMaquina ORDER BY b.dataHoraRegistroBateria DESC) AS rn
      FROM
          bateria b
)
SELECT
      m.idProcessador AS Maquina,
      m.nome,
      MAX(CASE WHEN c.nomeComponente = 'processador' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS CPU,
      MAX(CASE WHEN c.nomeComponente = 'memoria' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS RAM,
      MAX(CASE WHEN c.nomeComponente = 'disco' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS DISCO,
      ub.porcentagemBateria AS BATERIA
FROM
      maquina m
LEFT JOIN
      componente c ON c.fkMaquina = m.idProcessador
LEFT JOIN
      UltimoRegistro u ON c.idComponente = u.fkComponente AND u.fkMaquina = m.idProcessador AND u.rn = 1
LEFT JOIN
      UltimaBateria ub ON m.idProcessador = ub.fkMaquina AND ub.rn = 1
WHERE
      m.fkInstituicao = @idInstituicao
GROUP BY
      m.idProcessador, m.nome, ub.porcentagemBateria;
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
            reject(new Error("Máquinas não encontradas"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  mediaDeUsoComponentes(idInstituicao) {
    const query = `SET LANGUAGE 'Portuguese';

    WITH UltimoRegistro AS (
        SELECT
            r.fkComponente,
            r.fkMaquina,
            r.valorCaptura,
            r.dataHoraRegistro,
            DATENAME(WEEKDAY, r.dataHoraRegistro) AS DiaSemana,
            ROW_NUMBER() OVER (PARTITION BY r.fkComponente, r.fkMaquina ORDER BY r.dataHoraRegistro DESC) AS rn
        FROM
            registro r
        WHERE
            r.dataHoraRegistro >= DATEADD(DAY, -5, GETDATE())
    ),
    DiasSemanaOrdenados AS (
        SELECT 'Segunda-feira' AS DiaSemana, 1 AS Ordenacao
        UNION ALL
        SELECT 'Terça-feira', 2
        UNION ALL
        SELECT 'Quarta-feira', 3
        UNION ALL
        SELECT 'Quinta-feira', 4
        UNION ALL
        SELECT 'Sexta-feira', 5
        UNION ALL
        SELECT 'Sábado', 6
        UNION ALL
        SELECT 'Domingo', 7
    )
    SELECT
        dso.DiaSemana,
        AVG(CASE WHEN c.nomeComponente = 'processador' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS MediaCPU,
        AVG(CASE WHEN c.nomeComponente = 'memoria' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS MediaRAM,
        AVG(CASE WHEN c.nomeComponente = 'disco' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS MediaDISCO
    FROM
        DiasSemanaOrdenados dso
    LEFT JOIN
        UltimoRegistro u ON dso.DiaSemana = u.DiaSemana
    LEFT JOIN
        componente c ON u.fkComponente = c.idComponente
    LEFT JOIN
        maquina m ON u.fkMaquina = m.idProcessador
    WHERE
        m.fkInstituicao = @idInstituicao
    GROUP BY
        dso.DiaSemana, dso.Ordenacao
    ORDER BY
        dso.Ordenacao;
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
            reject(new Error("Registros não encontrados"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // MAQUINAS INDIVIDUAIS

  usoDeComponente(idProcessador, nomeComponente) {
    let query;
    if (nomeComponente === "disco") {
      query = `SELECT TOP 1 r.valorCaptura, c.especificacaoComponente, FORMAT(r.dataHoraRegistro, 'HH:mm:ss') AS momento FROM registro r
      INNER JOIN componente c ON r.fkComponente = c.idComponente
      WHERE c.nomeComponente = @nomeComponente AND r.fkMaquina = @idProcessador
      ORDER BY idRegistro DESC`;
    } else {
      query = `SELECT TOP 5 r.valorCaptura, c.especificacaoComponente, FORMAT(r.dataHoraRegistro, 'HH:mm:ss') AS momento FROM registro r
      INNER JOIN componente c ON r.fkComponente = c.idComponente
      WHERE c.nomeComponente = @nomeComponente AND r.fkMaquina = @idProcessador
      ORDER BY idRegistro DESC`;
    }

    return new Promise((resolve, reject) => {
      sql
        .connect()
        .then((pool) => {
          return pool
            .request()
            .input("nomeComponente", sql.VarChar, nomeComponente)
            .input("idProcessador", sql.VarChar, idProcessador)
            .query(query);
        })
        .then((result) => {
          if (result.recordset.length > 0) {
            resolve(result.recordset);
          } else {
            reject(new Error("Registros não encontrados"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  usoDeComponentePorProcessador(idProcessador, nomeComponente) {
    let query;
    if (nomeComponente === "disco") {
      query = `SELECT TOP 1 r.valorCaptura, c.especificacaoComponente, FORMAT(r.dataHoraRegistro, 'HH:mm:ss') AS momento FROM registro r
      INNER JOIN componente c ON r.fkComponente = c.idComponente
      WHERE c.nomeComponente = @nomeComponente AND r.fkMaquina = @idProcessador
      ORDER BY idRegistro DESC`;
    } else {
      query = `SELECT TOP 5 r.valorCaptura, c.especificacaoComponente, FORMAT(r.dataHoraRegistro, 'HH:mm:ss') AS momento FROM registro r
      INNER JOIN componente c ON r.fkComponente = c.idComponente
      WHERE c.nomeComponente = @nomeComponente AND r.fkMaquina = @idProcessador
      ORDER BY idRegistro DESC`;
    }

    return new Promise((resolve, reject) => {
      sql
        .connect()
        .then((pool) => {
          return pool
            .request()
            .input("nomeComponente", sql.VarChar, nomeComponente)
            .input("idProcessador", sql.VarChar, idProcessador)
            .query(query);
        })
        .then((result) => {
          if (result.recordset.length > 0) {
            resolve(result.recordset);
          } else {
            reject(new Error("Registros não encontrados"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  mudarStatusDaMaquina(numAcao, idInstituicao, idProcessador) {
    const query =
      "UPDATE maquina SET status = @numAcao WHERE fkInstituicao = @idInstituicao AND idProcessador = @idProcessador";

    return new Promise((resolve, reject) => {
      sql
        .connect()
        .then((pool) => {
          return pool
            .request()
            .input("numAcao", sql.Int, numAcao)
            .input("idInstituicao", sql.VarChar, idInstituicao)
            .input("idProcessador", sql.VarChar, idProcessador)
            .query(query);
        })
        .then((result) => {
          if (result.rowsAffected[0] > 0) {
            resolve({ message: "Status atualizado com sucesso" });
          } else {
            reject(new Error("Registros não encontrados"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = new maquinasModel();
