const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController")

router.get("/login", (req, res) => {
    const listaUsuarios = userController.buscar();
    listaUsuarios
        .then(usuarios => res.status(200).json(usuarios))
        .catch(error => res.status(400).json(error.message));
});

router.post("/login", async (req, res) => {
    try {
        const novoUsuario = req.body;
        console.log(novoUsuario);
        const usuarioCriado = await userController.criar(novoUsuario);
        res.status(201).json(usuarioCriado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/login/atualizar/:id", (req, res) => {
    const { id } = req.params;
    const usuarioAtualizado = req.body;
    const usuario = userController.atualizar(usuarioAtualizado, id);
    usuario
        .then((resultUsuarioAtualizado) => res.status(200).json(resultUsuarioAtualizado))
        .catch((error) => res.status(400).json(error.message));
});

router.delete("/login/deletar/:id", (req, res) => {
    const { id } = req.params;
    const usuario = userController.deletar(id);
    usuario
        .then((resultUsuarioDeletado) => res.status(200).json(resultUsuarioDeletado))
        .catch((error) => res.status(400).json(error.message));
});

module.exports = router;