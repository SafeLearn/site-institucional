const conexao = require("../infra/conexao");

class cadastroModel {
    cadastrarUsuario(novoUsuario) {
        const sql = "INSERT INTO usuario (userName, emailUsuario, senhaUsuario) VALUES (@userName, @emailUsuario, @senhaUsuario)";
        const values = {
            userName: novoUsuario.nomePessoal,
            emailUsuario: novoUsuario.emailPessoal,
            senhaUsuario: novoUsuario.senhaPessoal
        };
        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (error, resposta) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(resposta);
                }
            });
        }); 
    }

    cadastrarInstituicao(novaInstituicao) {
        const sql = "INSERT INTO Instituicao (nomeInstituicao, cepInstituicao, estadoInstituicao, cidadeInstituicao, ruaInstituicao, numeroEnderecoInstituicao, emailInstituicao, telefoneInstituicao, cnpjInstituicao) VALUES (@nomeInstituicao, @cepInstituicao, @estadoInstituicao, @cidadeInstituicao, @ruaInstituicao, @numeroEnderecoInstituicao, @emailInstituicao, @telefoneInstituicao, @cnpjInstituicao)";
        const values = {
            nomeInstituicao: novaInstituicao.nomeInstituicao,
            cepInstituicao: novaInstituicao.cepInstituicao,
            estadoInstituicao: novaInstituicao.estadoInstituicao,
            cidadeInstituicao: novaInstituicao.cidadeInstituicao,
            ruaInstituicao: novaInstituicao.ruaInstituicao,
            numeroEnderecoInstituicao: novaInstituicao.numeroEnderecoInstituicao,
            emailInstituicao: novaInstituicao.emailInstituicao,
            telefoneInstituicao: novaInstituicao.telefoneInstituicao,
            cnpjInstituicao: novaInstituicao.cnpjInstituicao
        };
        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (error, resposta) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(resposta);
                }
            });
        }); 
    }
}

module.exports = new cadastroModel();
