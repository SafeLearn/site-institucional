const atualizarModel = require("../models/atualizarModel");
class atualizarController {
    atualizarUsuario(usuarioAtualizado, id) {
        return atualizarModel.atualizarUsuario(usuarioAtualizado, id);
    }

    atualizarInstituicao(instituicaoAtualizada, id) {
        return atualizarModel.atualizarInstituicao(instituicaoAtualizada, id);
    }
}

module.exports = new atualizarController();
