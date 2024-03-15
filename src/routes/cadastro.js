const { Router } = require("express");
const router = Router();
const cadastroController = require("../controllers/cadastroController");

router.get("/cadastro-usuario", (req, res) => {
    res.sendFile("cadastroPessoal.html", { root: "public" });
});

router.get("/cadastro-instituicao", (req, res) => {
    res.sendFile("cadastroInstitucional.html", { root: "public" });
});

router.post("/usuario/cadastrar", async (req, res) => {
    try {
        const novoUsuario = req.body;
        const usuarioCriado = await cadastroController.cadastrarUsuario(novoUsuario);
        res.status(201).json(usuarioCriado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/instituicao/cadastrar", async (req, res) => {
    try {
        const novaInstituicao = req.body;
        const instituicaoCriada = await cadastroController.cadastrarInstituicao(novaInstituicao);
        res.status(201).json(instituicaoCriada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;