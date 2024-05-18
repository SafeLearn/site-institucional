const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const router = require("./src/routes/index");
const app = express();
const port = 80;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "public"));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

router(app, express);

const homeRoute = require("./src/routes/home");
const cadastroRoute = require("./src/routes/cadastro");
const loginRoute = require("./src/routes/login");
const atualizarRoute = require("./src/routes/atualizar");
const deletarRoute = require("./src/routes/deletar");

app.use("/", homeRoute);
app.use("/cadastro", cadastroRoute);
app.use("/login", loginRoute);
app.use("/atualizar", atualizarRoute);
app.use("/deletar", deletarRoute);

app.get("/cadastrar-me", (req, res) => {
    res.sendFile("cadastroPessoal.html", { root: "public" });
});

app.get("/cadastrar-instituicao", (req, res) => {
    res.sendFile("cadastroInstitucional.html", { root: "public" });
});

app.get("/logar", (req, res) => {
    res.sendFile("login.html", { root: "public" });
});

app.get("/esqueceu-sua-senha", (req, res) => {
    res.sendFile("recuperarsenha.html", { root: "public" });
});

app.get("/trocar-senha", (req, res) => {
    res.sendFile("trocarsenha.html", { root: "public" });    
});

app.get("/dashboard", (req, res) => {
    res.sendFile("dashboard.html", { root: "public" });
})

app.listen(port, (error) => {
    if(error) {
        console.log(`Erro: ${error}`);
        return;
    }
    console.log(`Subiu na porta ${port}`);
});