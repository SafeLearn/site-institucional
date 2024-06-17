const express = require('express');
const nivelAcessoController = require('../controllers/nivelAcessoController');

const router = express.Router();

router.post('/cadastrarNivelAcesso', (req, res) => {
    nivelAcessoController.cadastrarNivelAcesso(req, res);
});

router.get('/listarNiveisAcesso', (req, res) => {
    nivelAcessoController.listarNiveisAcesso(req, res);
});

router.put('/atualizarNivelAcesso/:idNivelDeAcesso', async (req, res) => {
    nivelAcessoController.atualizarNivelAcesso(req, res);
});

router.delete('/excluirNivelAcesso/:idNivelDeAcesso', async (req, res) => {
    nivelAcessoController.excluirNivelAcesso(req, res);
});

module.exports = router;
