const sql = require('mssql');

// const newLocal = {
//     server: "ec2-52-73-82-233.compute-1.amazonaws.com",
//     database: "safelearn",
//     user: "sa",
//     password: "senha",
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: true,
//         trustServerCertificate: true
//     }
// };

const config = {
    server: "safelearn-server.database.windows.net",
    database: "safelearn",
    user: "user",
    password: "senha123.",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// const config = newLocal;

async function connect() {
    try {
        await sql.connect(config);
        console.log("Conexão com SQL Server estabelecida com sucesso!");
    } catch (err) {
        console.error("Erro ao conectar ao SQL Server: ", err);
    }
}

// connect(); //teste
// module.exports = sql; // teste

module.exports = { sql, connect }; //antigo
