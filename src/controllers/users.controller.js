const {
  postUser,
  selectUserByID,
  patchUser,
  deleteUser,
  selectUserByEmail,
} = require('../models/users.model');
const { formatUserData } = require('../utils/formatUserData');

exports.createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const data = await postUser(newUser);
    const formattedUser = formatUserData(data);
    res.status(201).send(formattedUser);
  } catch (err) {
    // console.error('Error creating user:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const { documents } = await selectUserByEmail(email);
    const formattedUser = formatUserData(documents[0]);
    res.status(200).send(formattedUser);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(404).send({ error: err.message });
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await selectUserByID(userID);
    const formattedUser = formatUserData(data);
    res.status(200).send(formattedUser);
  } catch (err) {
    // console.error('Error fetching user:', err);
    res.status(404).send({ error: err.message });
  }
};

exports.editUserByID = async (req, res) => {
  try {
    const { userID } = req.params;
    let { email, password } = req.body;
    const data = await patchUser(userID, { email, password });
    const user = formatUserData(data);
    res.status(200).send(user);
  } catch (err) {
    // console.error('Error editing user:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.removeUserByID = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await deleteUser(userID);
    res.status(204).send(data);
  } catch (err) {
    // console.error('Error removing user:', err);
    res.status(400).send({ error: err.message });
  }
};
