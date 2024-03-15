const loginModel = require("../models/loginModel");
class loginController {
    buscar() {
        return loginModel.buscar();
    }
}

module.exports = new loginController();