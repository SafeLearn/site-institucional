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
}

module.exports = new maquinasModel();