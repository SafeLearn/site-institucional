const loginModel = require("../models/loginModel");
class loginController {
    buscar(dadosLogin) {
        return loginModel.buscar(dadosLogin);
    }
}

module.exports = new loginController();