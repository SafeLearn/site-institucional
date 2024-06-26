const maquinasModel = require("../models/maquinasModel");

class maquinaController {
    async buscarMaquinasPorInstituicao(idInstituicao){
        return await maquinasModel.buscarMaquinasPorInstituicao(idInstituicao);
    }

    async buscarBateria (idInstituicao){
        return await maquinasModel.buscarBateria(idInstituicao);
    }

    async buscarBateriaMaquina(idInstituicao, idProcessador){
        return await maquinasModel.buscarBateriaMaquina(idInstituicao, idProcessador);
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

    async mudarStatusMaquina (numAcao, idInstituicao, idProcessador) {
        return await maquinasModel.mudarStatusDaMaquina(numAcao, idInstituicao, idProcessador);
    }
}

module.exports = new maquinaController;