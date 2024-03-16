const userModel = require("../models/userModel");
class userController {
    buscar() {
        return userModel.buscar();
    }

    async criar(novoUsuario) {
        return await userModel.criar(novoUsuario);
    }

    atualizar(usuarioAtualizado, id) {
        return userModel.atualizar(usuarioAtualizado, id);
    }

    deletar(id) {
        return userModel.deletar(id);
    }
}

module.exports = new userController();