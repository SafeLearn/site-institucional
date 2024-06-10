const userModel = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const createUser = async (req, res) => {
  try {
    const userId = await userModel.createUser(req.body);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

const updateUser = async (req, res) => {
  try {
    await userModel.updateUser(req.params.id, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
