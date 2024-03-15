const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const router = require("./src/routes/index");
const conexao = require("./src/infra/conexao");
const tabelas = require("./src/infra/tabelas");
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "public"));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

router(app, express);
tabelas.init(conexao);

const homeRoute = require("./src/routes/home");
const cadastroRoute = require("./src/routes/cadastro");
const atualizarRoute = require("./src/routes/atualizar");
const deletarRoute = require("./src/routes/deletar");

app.use("/", homeRoute);
app.use("/cadastro", cadastroRoute);
app.use("/atualizar", atualizarRoute);
app.use("/deletar", deletarRoute);

app.listen(port, (error) => {
    if(error) {
        console.log(`Erro: ${error}`);
        return;
    }
    console.log(`Subiu na porta ${port}`);
});