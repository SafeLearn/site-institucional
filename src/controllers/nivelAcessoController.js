const nivelAcessoModel = require("../models/nivelAcessoModel");

async function cadastrarNivelAcesso(req, res) {
  const { nivelDeAcesso } = req.body;

  if (!nivelDeAcesso) {
    return res.status(400).json({ error: "O campo nível de acesso deve ser preenchido." });
  }

  try {
    const resultado = await nivelAcessoModel.cadastrarNivelAcesso(nivelDeAcesso);
    res.json(resultado);
  } catch (erro) {
    console.error("Erro ao cadastrar nível de acesso:", erro);
    res.status(500).json({ error: "Houve um erro ao cadastrar o nível de acesso." });
  }
}

async function listarNiveisAcesso(req, res) {
  try {
    const resultado = await nivelAcessoModel.listarNiveisAcesso();
    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao listar níveis de acesso:", erro);
    res.status(500).json({ error: "Houve um erro ao listar os níveis de acesso." });
  }
}

async function atualizarNivelAcesso(req, res) {
  const idNivelDeAcesso = req.params.idNivelDeAcesso;
  const { nivelDeAcesso } = req.body;

  if (!nivelDeAcesso) {
    return res.status(400).json({ error: "O campo nível de acesso deve ser preenchido." });
  }

  try {
    const resultado = await nivelAcessoModel.atualizarNivelAcesso(parseInt(idNivelDeAcesso), nivelDeAcesso);
    res.json(resultado);
  } catch (erro) {
    console.error("Erro ao atualizar nível de acesso:", erro);
    res.status(500).json({ error: "Houve um erro ao atualizar o nível de acesso." });
  }
}

async function excluirNivelAcesso(req, res) {
  const idNivelDeAcesso = req.params.idNivelDeAcesso;

  try {
    const resultado = await nivelAcessoModel.excluirNivelAcesso(parseInt(idNivelDeAcesso));
    res.json(resultado);
  } catch (erro) {
    console.error("Erro ao excluir nível de acesso:", erro);
    res.status(500).json({ error: "Houve um erro ao excluir o nível de acesso." });
  }
}

module.exports = {
  cadastrarNivelAcesso,
  listarNiveisAcesso,
  atualizarNivelAcesso,
  excluirNivelAcesso,
};
