const { Router } = require("express");
const router = Router();
const cadastroController = require("../controllers/cadastroController");

router.post("/usuario", async (req, res) => {
    try {
        const novoUsuario = req.body;
        const usuarioCriado = await cadastroController.cadastrarUsuario(novoUsuario);
        res.status(201).json(usuarioCriado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/instituicao", async (req, res) => {
    try {
        const novaInstituicao = req.body;
        const instituicaoCriada = await cadastroController.cadastrarInstituicao(novaInstituicao);
        res.status(201).json(instituicaoCriada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;