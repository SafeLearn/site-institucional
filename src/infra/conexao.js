const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    database: "wheelknights",
    user: "root",
    password: "#Spfc2735$#"
});

module.exports = conexao;