const cadastroRoute = require("./cadastro");
const atualizarRoute = require("./atualizar");
const deletarRoute = require("./deletar");
module.exports = (app, express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cadastroRoute);    
    app.use(atualizarRoute);    
    app.use(deletarRoute);    
}