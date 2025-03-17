const {
  authUser,
  addEvent,
  exchangeCodeForToken,
  refreshToken,
} = require('../controllers/googleAPI.controller');

const googleRouter = require('express').Router();

googleRouter.get('/auth-url', authUser);

googleRouter.post('/event', addEvent);

googleRouter.post('/tokens', exchangeCodeForToken);

module.exports = { googleRouter };
