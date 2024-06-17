const express = require('express');
const nomeMaquinaController = require('../controllers/nomeMaquinaController');

const router = express.Router();

router.post('/cadastrarNomeMaquina', nomeMaquinaController.cadastrarNomeMaquina);
router.get('/listarNomesMaquina', nomeMaquinaController.listarNomesMaquina);
router.put('/atualizarNomeMaquina/:idNomeMaquina', nomeMaquinaController.atualizarNomeMaquina);
router.delete('/excluirNomeMaquina/:idNomeMaquina', nomeMaquinaController.excluirNomeMaquina);

module.exports = router;
