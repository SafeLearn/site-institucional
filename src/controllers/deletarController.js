const deletarModel = require("../models/deletarModel");
class deletarController {
    deletarUsuario(id) {
        return deletarModel.deletarUsuario(id);
    }

    deletarInstituicao(id) {
        return deletarModel.deletarInstituicao(id);
    }
}

module.exports = new deletarController();