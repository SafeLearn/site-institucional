const cadastroModel = require("../models/cadastroModel");
class cadastroController {
    buscar() {
        return cadastroModel.buscar();
    }

    async cadastrarUsuario(novoUsuario) {
        return await cadastroModel.cadastrarUsuario(novoUsuario);
    }

    async cadastrarInstituicao(novaInstituicao) {
        return await cadastroModel.cadastrarInstituicao(novaInstituicao);
    }
}

module.exports = new cadastroController();