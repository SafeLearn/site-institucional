const { sql } = require("../infra/conexao");

class maquinasModel {
    buscarMaquinasPorInstituicao(idInstituicao) {
        const query = `SELECT idProcessador, nome, sistemaOperacional, status FROM maquina WHERE fkInstituicao = @idInstituicao;`;

        return new Promise((resolve, reject) => {
            sql.connect().then(pool => {
                return pool.request()
                .input('idInstituicao', sql.Int, idInstituicao)
                .query(query);
            }).then(result => {
                if(result.recordset.length > 0) {
                    resolve(result.recordset);
                }else{
                    reject(new Error("Máquinas não encontradas"))
                }
            }).catch(err => {
                reject(err);
            })
        })
    }

    buscarBateriaMaquina(idInstituicao){
        const query = `SELECT idProcessador, nome, valorCaptura FROM maquina 
        LEFT JOIN componente ON fkMaquina = idProcessador
            LEFT JOIN registro ON fkComponente = idComponente
                WHERE fkInstituicao = @idInstituicao AND nomeComponente LIKE 'Bateria';`;

                return new Promise((resolve, reject) => {
                    sql.connect().then(pool => {
                        return pool.request()
                        .input('idInstituicao', sql.Int, idInstituicao)
                        .query(query);
                    }).then(result => {
                        if(result.recordset.length > 0) {
                            resolve(result.recordset);
                        }else{
                            reject(new Error("Máquinas não encontradas"))
                        }
                    }).catch(err => {
                        reject(err);
                    })
                });
    }

    porcentagemComponentes(idInstituicao){
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
                    sql.connect().then(pool => {
                        return pool.request()
                        .input('idInstituicao', sql.Int, idInstituicao)
                        .query(query);
                    }).then(result => {
                        if(result.recordset.length > 0) {
                            resolve(result.recordset);
                        }else{
                            reject(new Error("Máquinas não encontradas"))
                        }
                    }).catch(err => {
                        reject(err);
                    })
                });
    }
}

module.exports = new maquinasModel();