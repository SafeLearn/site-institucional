const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 3000;
const router = require("./src/routes/index");
const conexao = require("./src/infra/conexao");
const tabelas = require("./src/infra/tabelas");


router(app, express);
tabelas.init(conexao);

app.listen(port, (error) => {
    if(error) {
        console.log(`Erro: ${error}`);
        return;
    }
    console.log(`Subiu na porta ${port}`);
});