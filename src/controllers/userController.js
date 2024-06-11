const userModel = require('../models/userModel');

async function cadastrarUsuario(req, res) {
    const { nome, email, senha, nivelAcesso } = req.body;

    if (!nome || !email || !senha || !nivelAcesso) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos." });
    }

    try {
        const userId = await userModel.cadastrarUsuario(nome, email, senha, nivelAcesso);
        res.status(201).json({ id: userId });
    } catch (error) {
        console.error("Houve um erro ao realizar o cadastro: ", error);
        res.status(500).json({ error: "Houve um erro ao realizar o cadastro." });
    }
}

async function obterUsuarios(req, res) {
    try {
        const usuarios = await userModel.obterUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Houve um erro ao obter os usuários: ", error);
        res.status(500).json({ error: "Houve um erro ao obter os usuários." });
    }
}

async function atualizarUsuario(req, res) {
    const userId = req.params.id;
    const { nome, email, senha, nivelAcesso } = req.body;

    if (!nome || !email || !senha || !nivelAcesso) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos." });
    }

    try {
        await userModel.atualizarUsuario(userId, nome, email, senha, nivelAcesso);
        res.status(204).end();
    } catch (error) {
        console.error("Houve um erro ao atualizar o usuário: ", error);
        res.status(500).json({ error: "Houve um erro ao atualizar o usuário." });
    }
}

async function excluirUsuario(req, res) {
    const userId = req.params.id;

    try {
        await userModel.excluirUsuario(userId);
        res.status(204).end();
    } catch (error) {
        console.error("Houve um erro ao excluir o usuário: ", error);
        res.status(500).json({ error: "Houve um erro ao excluir o usuário." });
    }
}

module.exports = {
    cadastrarUsuario,
    obterUsuarios,
    atualizarUsuario,
    excluirUsuario
};
