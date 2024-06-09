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

    // MAQUINAS ESPECIFICAS

    async usoDeComponente (idProcessador, nomeComponente) {
        return await maquinasModel.usoDeComponente(idProcessador, nomeComponente)
    }

    async usoDeComponenteTempoReal(idProcessador, nomeComponente) {
        return await maquinasModel.buscarDadosEmTempoReal(idProcessador, nomeComponente)
    }
}

module.exports = new maquinaController;