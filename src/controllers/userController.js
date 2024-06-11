const userModel = require("../models/userModel");

async function cadastrarUsuario(req, res) {
  const { nome, email, senha, nivelAcesso, idInstituicao } = req.body;

  if (!nome || !email || !senha || !nivelAcesso || !idInstituicao) {
    return res
      .status(400)
      .json({ error: "Todos os campos devem ser preenchidos." });
  }

  if (isNaN(nivelAcesso)) {
    return res
      .status(400)
      .json({ error: "Nível de acesso deve ser um número." });
      
  }
  console.log(nivelAcesso);
  try {
    const resultado = await userModel.cadastrarUsuario(
      nome,
      email,
      senha,
      parseInt(nivelAcesso),
      parseInt(idInstituicao)
    );
    res.json(resultado);
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);
    res.status(500).json({ error: "Houve um erro ao cadastrar o usuário." });
  }
}

async function listarUsuarios(req, res) {
    const idInstituicao = req.params.idInstituicao;
    const idUsuario = req.params.idUsuario;

    userModel.listarUsuarios(idInstituicao, idUsuario).then(
        function (resultado) {
            if(resultado.length > 0) {
                res.status(200).json(resultado);
            }else{
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os usuários!", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

async function atualizarUsuario(req, res) {
  const idUsuario = req.params.idUsuario;
  const { nome, email, senha, nivelAcesso, idInstituicao } = req.body;

  if (!nome || !email || !senha || !nivelAcesso) {
    return res
      .status(400)
      .json({ error: "Todos os campos devem ser preenchidos." });
  }

  try {
    const resultado = await userModel.atualizarUsuario(parseInt(idUsuario), nome, email, senha, parseInt(nivelAcesso), parseInt(idInstituicao));

    if (resultado.rowsAffected > 0) {
        res.json({ message: 'Usuário atualizado com sucesso' });
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Houve um erro ao atualizar o usuário.' });
  }
}

async function excluirUsuario(req, res) {
  const userId = req.params.id;
  const idInstituicao = req.params.idInstituicao;

  try{
    const resultado = await userModel.excluirUsuario(parseInt(userId), parseInt(idInstituicao));

    if(resultado.rowsAffected[0] > 0) {
        res.json({message: 'Usuário excluído com sucesso'});
    }else{
        res.status(404).json({error: 'Usuário não encontrado'});
    }
  }catch(error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({error: 'Houve um erro ao excluir o usúario'})
  }
}

module.exports = {
  cadastrarUsuario,
  listarUsuarios,
  atualizarUsuario,
  excluirUsuario,
};
