const { Router } = require("express");
const router = Router();
const maquinaController = require("../controllers/maquinaController");

router.get("buscar/:idInstituicao", async (req, res) => {
    try {
        const idInstituicao = req.params.idInstituicao;
        const maquinas = await maquinaController.buscarMaquinasPorInstituicao(idInstituicao);

        res.status(201).json(maquinas);
        console.log("TO AQUI")
    }catch (error) {
        console.log("ERRO AQUI")
        res.status(400).json({ message: error.message });
        console.error(error.message);
    }
});

module.exports = router;