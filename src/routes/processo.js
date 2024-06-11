const { Router } = require("express");
const router = Router();
const processoController = require("../controllers/processoController");

router.get("/maioresProcessos/:idInstituicao", async (req, res) => {
    try{
        const idInstituicao = req.params.idInstituicao;
        const maioresProcessos = await processoController.maioresConsumosPorProcesso(idInstituicao);

        res.status(200).json(maioresProcessos);
    }catch (error) {
        res.status(400).json({ message: error.message});
        console.error(error.message);
    }
})

router.get("/listarProcessos/:idInstituicao/:idMaquina", async (req, res) => {
    try{
        const idInstituicao = req.params.idInstituicao;
        const idMaquina = req.params.idMaquina;
        const processos = await processoController.listarTodosProcessos(idInstituicao, idMaquina);

        res.status(200).json(processos);
    }catch (error) {
        res.status(400).json({ message: error.message});
        console.error(error.message);
    }
})

module.exports = router;