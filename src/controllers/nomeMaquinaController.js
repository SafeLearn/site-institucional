const nomeMaquinaModel = require("../models/NomeMaquinaModel");

async function cadastrarNomeMaquina(req, res) {
  const { nomeMaquina } = req.body;

  if (!nomeMaquina) {
    return res.status(400).json({ error: "O campo nome da máquina deve ser preenchido." });
  }

  try {
    const resultado = await nomeMaquinaModel.cadastrarNomeMaquina(nomeMaquina);
    res.json(resultado);
  } catch (erro) {
    console.error("Erro ao cadastrar nome da máquina:", erro);
    res.status(500).json({ error: "Houve um erro ao cadastrar o nome da máquina." });
  }
}

async function listarNomesMaquina(req, res) {
  try {
    const resultado = await nomeMaquinaModel.listarNomesMaquina();
    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao listar nomes de máquinas:", erro);
    res.status(500).json({ error: "Houve um erro ao listar os nomes de máquinas." });
  }
}

async function atualizarNomeMaquina(req, res) {
  const idNomeMaquina = req.params.idNomeMaquina;
  const { nomeMaquina } = req.body;

  if (!nomeMaquina) {
    return res.status(400).json({ error: "O campo nome da máquina deve ser preenchido." });
  }

  try {
    const resultado = await nomeMaquinaModel.atualizarNomeMaquina(parseInt(idNomeMaquina), nomeMaquina);
    res.json(resultado);
  } catch (erro) {
    console.error("Erro ao atualizar nome da máquina:", erro);
    res.status(500).json({ error: "Houve um erro ao atualizar o nome da máquina." });
  }
}

async function excluirNomeMaquina(req, res) {
  const idNomeMaquina = req.params.idNomeMaquina;

  try {
    const resultado = await nomeMaquinaModel.excluirNomeMaquina(parseInt(idNomeMaquina));
    res.json(resultado);
  } catch (erro) {
    console.error("Erro ao excluir nome da máquina:", erro);
    res.status(500).json({ error: "Houve um erro ao excluir o nome da máquina." });
  }
}

module.exports = {
  cadastrarNomeMaquina,
  listarNomesMaquina,
  atualizarNomeMaquina,
  excluirNomeMaquina,
};
