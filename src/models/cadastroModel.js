const conexao = require("../infra/conexao");
class cadastroModel {
    cadastrarUsuario(novoUsuario) {
        const sql = "INSERT INTO usuario (cargoPessoal, emailPessoal, senhaPessoal, nomePessoal, telefonePessoal) VALUES (?, ?, ?, ?, ?)";
        const values = [novoUsuario.cargoPessoal,
            novoUsuario.emailPessoal,
            novoUsuario.senhaPessoal,
            novoUsuario.nomePessoal,
            novoUsuario.telefonePessoal];
        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });
        }); 
    }

    cadastrarInstituicao(novaInstituicao) {
        const sql = "INSERT INTO Instituicao (nomeInstituicao, cepInstituicao, estadoInstituicao, cidadeInstituicao, ruaInstituicao, numeroEnderecoInstituicao, emailInstituicao, telefoneInstituicao, cnpjInstituicao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [novaInstituicao.nomeInstituicao,
            novaInstituicao.cepInstituicao,
            novaInstituicao.estadoInstituicao,
            novaInstituicao.cidadeInstituicao,
            novaInstituicao.ruaInstituicao,
            novaInstituicao.numeroEnderecoInstituicao,
            novaInstituicao.emailInstituicao,
            novaInstituicao.telefoneInstituicao,
            novaInstituicao.cnpjInstituicao];
        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (error, resposta) => {
                if(error) {
                    reject(error);
                }
                resolve(resposta);
            });
        }); 
    }
}

module.exports = new cadastroModel();