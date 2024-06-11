const processoModel = require("../models/processoModel");

class processoController {
    async maioresConsumosPorProcesso(idInstituicao){
        return await processoModel.maioresConsumosPorProcesso(idInstituicao);
    }

    async maioresProcessosUso(idInstituicao){
        return await processoModel.maioresProcessosUso(idInstituicao);
    }

    async listarTodosProcessos(idInstituicao, idProcessador) {
        return await processoModel.listarTodosProcessos(idInstituicao, idProcessador);
    }
}

module.exports = new processoController;