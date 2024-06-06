const { query } = require("express");
const { sql } = require("../infra/conexao");

class maquinasModel {
  buscarMaquinasPorInstituicao(idInstituicao) {
    const query = `SELECT idProcessador, nome, sistemaOperacional, status FROM maquina WHERE fkInstituicao = @idInstituicao;`;

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

  buscarBateriaMaquina(idInstituicao) {
    const query = `SELECT idProcessador, nome, valorCaptura FROM maquina 
        LEFT JOIN componente ON fkMaquina = idProcessador
            LEFT JOIN registro ON fkComponente = idComponente
                WHERE fkInstituicao = @idInstituicao AND nomeComponente LIKE 'Bateria';`;

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

  porcentagemComponentes(idInstituicao) {
    const query = `WITH UltimoRegistro AS (
            SELECT 
                r.fkComponente,
                r.fkMaquina,
                r.valorCaptura,
                ROW_NUMBER() OVER (PARTITION BY r.fkComponente, r.fkMaquina ORDER BY r.dataHoraRegistro DESC) AS rn
            FROM 
                registro r
        )
        SELECT 
            m.idProcessador AS Maquina,
            MAX(CASE WHEN c.nomeComponente = 'CPU' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS CPU,
            MAX(CASE WHEN c.nomeComponente = 'RAM' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS RAM,
            MAX(CASE WHEN c.nomeComponente = 'DISCO' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS DISCO,
            MAX(CASE WHEN c.nomeComponente = 'BATERIA' THEN u.valorCaptura ELSE NULL END) AS BATERIA
        FROM 
            maquina m
        LEFT JOIN 
            componente c ON m.idProcessador = c.fkMaquina
        LEFT JOIN 
            UltimoRegistro u ON c.idComponente = u.fkComponente AND u.rn = 1
        WHERE 
            fkInstituicao = @idInstituicao
        GROUP BY 
            m.idProcessador;
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
        AVG(CASE WHEN c.nomeComponente = 'CPU' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS MediaCPU,
        AVG(CASE WHEN c.nomeComponente = 'RAM' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS MediaRAM,
        AVG(CASE WHEN c.nomeComponente = 'DISCO' THEN LEAST((u.valorCaptura / c.especificacaoComponente) * 100, 100) ELSE NULL END) AS MediaDISCO,
        AVG(CASE WHEN c.nomeComponente = 'BATERIA' THEN u.valorCaptura ELSE NULL END) AS MediaBATERIA
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
}

module.exports = new maquinasModel();
