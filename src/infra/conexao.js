const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    database: "safe-learn",
    user: "root",
    password: "urubu100"
});

module.exports = conexao;