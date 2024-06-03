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

module.exports = router;