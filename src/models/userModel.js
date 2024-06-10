const db = require("../infra/conexao");

const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM usuario');
  return rows;
};

const createUser = async (user) => {
  const { userName, emailUsuario, senhaUsuario, fkNivelDeAcesso, fkInstituicao } = user;
  const [result] = await db.query('INSERT INTO usuario (userName, emailUsuario, senhaUsuario, fkNivelDeAcesso, fkInstituicao) VALUES (?, ?, ?, ?, ?)', [userName, emailUsuario, senhaUsuario, fkNivelDeAcesso, fkInstituicao]);
  return result.insertId;
};

const updateUser = async (id, user) => {
  const { userName, emailUsuario, senhaUsuario, fkNivelDeAcesso } = user;
  await db.query('UPDATE usuario SET userName = ?, emailUsuario = ?, senhaUsuario = ?, fkNivelDeAcesso = ? WHERE idUsuario = ?', [userName, emailUsuario, senhaUsuario, fkNivelDeAcesso, id]);
};

const deleteUser = async (id) => {
  await db.query('DELETE FROM usuario WHERE idUsuario = ?', [id]);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};
