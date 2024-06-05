const { sql } = require("../infra/conexao");

class processoModel {
    maioresConsumosPorProcesso(idInstituicao){
        const query = `SELECT TOP 5 nomeProcesso, consumoProcesso 
        FROM processo
        INNER JOIN maquina ON fkMaquina = idProcessador
        INNER JOIN instituicao ON fkInstituicao = idInstituicao
        WHERE idInstituicao = 1 
        AND dataHoraRegistroProcesso >= DATEADD(DAY, -7, GETDATE())
        ORDER BY consumoProcesso DESC;
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
                    reject(new Error("Processos não encontrados"));
                }
            }).catch(err => {
                reject(err);
            })
        })
    }
}

module.exports = new processoModel();