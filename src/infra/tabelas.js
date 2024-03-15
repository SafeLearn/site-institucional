class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarTabela();
    }

    criarTabela() {
        const sql = `
        create table if not exists Instituicao (
            idInstituicao int primary key auto_increment,
            nomeInstituicao varchar(50),
            cepInstituicao char(8),
            estadoInstituicao char(2),
            cidadeInstituicao varchar(50),
            ruaInstituicao varchar(50),
            numeroEnderecoInstituicao varchar(15),
            emailInstituicao varchar(100),
            telefoneInstituicao varchar(12),
            cnpjInstituicao varchar(14)
            );
        `;
        this.conexao.query(sql, (error) => {
            if(error) {
                console.log("Erro na hora de criar a tabela:");
                console.log(error);
                return;
            }
            console.log("Conexão Estabelecida");
        });
    }
}

module.exports = new Tabelas();
