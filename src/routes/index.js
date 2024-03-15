const cadastroRoute = require("./cadastro");
const loginRoute = require("./login");
const atualizarRoute = require("./atualizar");
const deletarRoute = require("./deletar");
module.exports = (app, express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cadastroRoute);    
    app.use(loginRoute);    
    app.use(atualizarRoute);    
    app.use(deletarRoute);    
}