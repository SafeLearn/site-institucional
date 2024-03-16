const { Router } = require("express");
const router = Router();
const loginController = require("../controllers/loginController");

router.post("/logar", async (req, res) => {
    try {
        const dadosLogin = req.body;
        const dadosLoginCriado = await loginController.buscar(dadosLogin);
        res.status(201).json(dadosLoginCriado);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error.message);
    }
});

module.exports = router;