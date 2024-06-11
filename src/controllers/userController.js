const userModel = require('../models/userModel');

function cadastrarUsuario(req, res) {
    const { nome, email, senha, nivelAcesso } = req.body;

    if (!nome || !email || !senha || !nivelAcesso) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos." });
    }

    userModel.cadastrarUsuario(nome, email, senha, nivelAcesso)
        .then(function (userId) {
            res.status(201).json({ id: userId });
        }).catch(function (error) {
            console.error("Houve um erro ao realizar o cadastro: ", error);
            res.status(500).json({ error: "Houve um erro ao realizar o cadastro." });
        });
}

function obterUsuarios(req, res) {
    userModel.obterUsuarios()
        .then(function (usuarios) {
            res.status(200).json(usuarios);
        }).catch(function (error) {
            console.error("Houve um erro ao obter os usuários: ", error);
            res.status(500).json({ error: "Houve um erro ao obter os usuários." });
        });
}

function atualizarUsuario(req, res) {
    const userId = req.params.id;
    const { nome, email, senha, nivelAcesso } = req.body;

    if (!nome || !email || !senha || !nivelAcesso) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos." });
    }

    userModel.atualizarUsuario(userId, nome, email, senha, nivelAcesso)
        .then(function () {
            res.status(204).end();
        }).catch(function (error) {
            console.error("Houve um erro ao atualizar o usuário: ", error);
            res.status(500).json({ error: "Houve um erro ao atualizar o usuário." });
        });
}

function excluirUsuario(req, res) {
    const userId = req.params.id;

    userModel.excluirUsuario(userId)
        .then(function () {
            res.status(204).end();
        }).catch(function (error) {
            console.error("Houve um erro ao excluir o usuário: ", error);
            res.status(500).json({ error: "Houve um erro ao excluir o usuário." });
        });
}

module.exports = {
    cadastrarUsuario,
    obterUsuarios,
    atualizarUsuario,
    excluirUsuario
};
