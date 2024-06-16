const { Router } = require("express");
const router = Router();
const maquinaController = require("../controllers/maquinaController");

router.get("/buscar/:idInstituicao", async (req, res) => {
    console.log('Rota chamada com idInstituicao:', req.params.idInstituicao);
    try {
        const idInstituicao = req.params.idInstituicao;
        const maquinas = await maquinaController.buscarMaquinasPorInstituicao(idInstituicao);

        res.status(200).json(maquinas);
    }catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error.message);
    }
});

router.get("/infoBateria/:idInstituicao", async (req, res) => {
   
    try {
        const idInstituicao = req.params.idInstituicao;
        const infos = await maquinaController.buscarBateria(idInstituicao);

        res.status(200).json(infos);
    }catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error.message);
    }
})

router.get("/buscarBateria/:idInstituicao/:idMaquina", async (req, res) => {
    try{
        const idInstituicao = req.params.idInstituicao;
        const idMaquina = req.params.idMaquina;
        const maquinasBateria = await maquinaController.buscarBateriaMaquina(idInstituicao, idMaquina);

        res.status(200).json(maquinasBateria);
    }catch(error) {
        res.status(400).json({message: error.message});
        console.error(error.message);
    }
})

router.get("/porcentagem/:idInstituicao", async (req, res) => {
    try{
        const idInstituicao = req.params.idInstituicao;
        const maquinasComponente = await maquinaController.porcentagemComponentes(idInstituicao);

        res.status(200).json(maquinasComponente);
    }catch(error){
        res.status(400).json({message: error.message});
        console.error(error.message);
    }
})

router.get("/mediaComponentes/:idInstituicao", async (req, res) => {
    try{
        const idInstituicao = req.params.idInstituicao;
        const mediaComponentes = await maquinaController.mediaDeUsoComponentes(idInstituicao);

        res.status(200).json(mediaComponentes);
    }catch(error){
        res.status(400).json({message: error.message});
        console.error(error.message);
    }
})

router.get("/usoDeComponente/:idProcessador/:nomeComponente", async (req, res) => {
    try{

        const idProcessador = req.params.idProcessador;
        const nomeComponente = req.params.nomeComponente;
        const usoDeComponente = await maquinaController.usoDeComponente(idProcessador, nomeComponente);

        res.status(200).json(usoDeComponente);
    }catch(error){
        res.status(400).json({message: error.message});
        console.error(error.message);
    }
})

router.get("/tempo-real/:idProcessador/:nomeComponente", async (req, res) => {
    try{
        const idProcessador = req.params.idProcessador;
        const nomeComponente = req.params.nomeComponente;
        const usoDeComponente = await maquinaController.usoDeComponente(idProcessador, nomeComponente);

        res.status(200).json(usoDeComponente);
    }catch(error){
        res.status(400).json({message: error.message});
        console.error(error.message);
    }
});

router.put("/mudarStatus/:numAcao/:idInstituicao/:idProcessador", async (req, res) => {
    try {
        const numAcao = req.params.numAcao;
        const idInstituicao = req.params.idInstituicao;
        const idProcessador = req.params.idProcessador;

        console.log("Parâmetros recebidos:", numAcao, idInstituicao, idProcessador);

        if (isNaN(numAcao) || isNaN(idInstituicao)) {
            return res.status(400).json({ message: "Parâmetros inválidos" });
        }

         const resultado = await maquinaController.mudarStatusMaquina(numAcao, idInstituicao, idProcessador);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error.message);
    }
});

module.exports = router;