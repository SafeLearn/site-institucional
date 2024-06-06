const maquinasModel = require("../models/maquinasModel");

class maquinaController {
    async buscarMaquinasPorInstituicao(idInstituicao){
        return await maquinasModel.buscarMaquinasPorInstituicao(idInstituicao);
    }

    async buscarBateriaMaquina(idInstituicao){
        return await maquinasModel.buscarBateriaMaquina(idInstituicao);
    }

    async porcentagemComponentes (idInstituicao){
        return await maquinasModel.porcentagemComponentes(idInstituicao)
    }

    async mediaDeUsoComponentes (idInstituicao){
        return await maquinasModel.mediaDeUsoComponentes(idInstituicao)
    }
}

module.exports = new maquinaController;