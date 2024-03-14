class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarTabela();
    }

    criarTabela() {
        const sql = `
            CREATE TABLE IF NOT EXISTS teste(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome varchar(50)
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
