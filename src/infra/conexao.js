const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    database: "safelearn",
    user: "root",
    password: "senha"
});

module.exports = conexao;