const conexao = require("../infra/conexao");

class atualizarModel {
    atualizarUsuario(usuarioAtualizado, id) {
        const sql = "UPDATE usuario SET userName = @userName, senhaUsuario = @senhaUsuario WHERE idUsuario = @id";
        return new Promise((resolve, reject) => {
            conexao.query(sql, {
                userName: usuarioAtualizado.userName,
                senhaUsuario: usuarioAtualizado.senhaUsuario,
                id: id
            }, (error, resposta) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(resposta);
                }
            });
        }); 
    }

    atualizarInstituicao(instituicaoAtualizada, id) {
        const sql = "UPDATE instituicao SET nomeInstituicao = @nomeInstituicao, endereco = @endereco WHERE idInstituicao = @id";
        return new Promise((resolve, reject) => {
            conexao.query(sql, {
                nomeInstituicao: instituicaoAtualizada.nomeInstituicao,
                endereco: instituicaoAtualizada.endereco,
                id: id
            }, (error, resposta) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(resposta);
                }
            });
        }); 
    }
}

module.exports = new atualizarModel();
