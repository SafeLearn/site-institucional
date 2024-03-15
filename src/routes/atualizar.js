const { Router } = require("express");
const router = Router();
const atualizarController = require("../controllers/atualizarController");

router.put("/usuario/atualizar/:id", (req, res) => {
    const { id } = req.params;
    const usuarioAtualizado = req.body;
    const usuario = atualizarController.atualizarUsuario(usuarioAtualizado, id);
    usuario
        .then((resultUsuarioAtualizado) => res.status(200).json(resultUsuarioAtualizado))
        .catch((error) => res.status(400).json(error.message));
});

router.put("/instituicao/atualizar/:id", (req, res) => {
    const { id } = req.params;
    const instituicaoAtualizada = req.body;
    const instituicao = atualizarController.atualizarInstituicao(instituicaoAtualizada, id);
    instituicao
        .then((resultInstituicaoAtualizada) => res.status(200).json(resultInstituicaoAtualizada))
        .catch((error) => res.status(400).json(error.message));
});

module.exports = router;