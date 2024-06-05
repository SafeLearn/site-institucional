const processoModel = require("../models/processoModel");

class processoController {
    async maioresConsumosPorProcesso(idInstituicao){
        return await processoModel.maioresConsumosPorProcesso(idInstituicao);
    }
}

module.exports = new processoController;