const {
  createUser,
  getUserByID,
  editUserByID,
  removeUserByID,
  getUserByEmail,
} = require('../controllers/users.controller');

const usersRouter = require('express').Router();

usersRouter.get('/', getUserByEmail);

usersRouter.get('/:userID', getUserByID);

usersRouter.post('/', createUser);

usersRouter.patch('/:userID', editUserByID);

usersRouter.delete('/:userID', removeUserByID);

module.exports = { usersRouter };
