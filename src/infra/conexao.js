const events = require('events');
events.EventEmitter.defaultMaxListeners = 20;

const sql = require("mssql");

const conexao = {
    user: "root",
    password: "senha",
    server: "localhost",
    database: "safelearn",
    options: {
        encrypt: false,
        trustServerCertificate: false  
    }
};

async function conectarBanco() {
    try {
        await sql.connect(conexao);
        console.log('Conexão bem-sucedida ao SQL Server');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
    }
}

conectarBanco();

module.exports = conexao;
