const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.obterUsuarios); // Rota para obter usuários
router.post('/cadastrarUsuario', userController.cadastrarUsuario); // Rota para cadastrar novo usuário
router.put('/:id', userController.atualizarUsuario); // Rota para atualizar usuário
router.delete('/:id', userController.excluirUsuario); // Rota para excluir usuário

module.exports = router;
