const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/cadastrarUsuario', (req, res) => {
    userController.cadastrarUsuario(req, res);
});

router.get('/listarUsuarios/:idInstituicao/:idUsuario', (req, res) => {
    userController.listarUsuarios(req, res);
});

router.put('/atualizarUsuario/:idUsuario', async (req, res) => {
    userController.atualizarUsuario(req, res)
});

router.delete('/excluirUsuario/:id/:idInstituicao', async (req, res) => {
    userController.excluirUsuario(req, res)
}); 

module.exports = router;
