const { Router } = require("express");
const router = Router();
const deletarController = require("../controllers/deletarController");

router.delete("/usuario/deletar/:id", (req, res) => {
    const { id } = req.params;
    const usuario = deletarController.deletarUsuario(id);
    usuario
        .then((resultUsuarioDeletado) => res.status(200).json(resultUsuarioDeletado))
        .catch((error) => res.status(400).json(error.message));
});

router.delete("/instituicao/deletar/:id", (req, res) => {
    const { id } = req.params;
    const instituicao = deletarController.deletarInstituicao(id);
    instituicao
        .then((resultInstituicaoDeletada) => res.status(200).json(resultInstituicaoDeletada))
        .catch((error) => res.status(400).json(error.message));
});

module.exports = router;