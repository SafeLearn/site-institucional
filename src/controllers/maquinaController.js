const maquinasModel = require("../models/maquinasModel");

class maquinaController {
    async buscarMaquinasPorInstituicao(idInstituicao){
        return await maquinasModel.buscarMaquinasPorInstituicao(idInstituicao);
    }

    async buscarBateriaMaquina(idInstituicao){
        return await maquinasModel.buscarBateriaMaquina(idInstituicao); //MUDAR LOGICA PARA RECEBER COMPONENTE PASSADO POR PARAMETRO???????
    }

    
}

module.exports = new maquinaController;