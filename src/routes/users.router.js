const {
  createUser,
  getUserByID,
  editUserByID,
  removeUserByID,
} = require('../controllers/users.controller');

const usersRouter = require('express').Router();

usersRouter.post('/', createUser);

usersRouter.get('/:userID', getUserByID);

usersRouter.patch('/:userID', editUserByID);

usersRouter.delete('/:userID', removeUserByID);

module.exports = { usersRouter };
