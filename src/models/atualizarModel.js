const conexao = require("../infra/conexao");
class atualizarModel {
    atualizarUsuario(usuarioAtualizado, id) {
        const sql = "UPDATE teste SET ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [usuarioAtualizado, id], (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });
        }); 
    }

    atualizarInstituicao(instituicaoAtualizada, id) {
        const sql = "UPDATE teste SET ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [instituicaoAtualizada, id], (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });
        }); 
    }
}

module.exports = new atualizarModel();