const express = require('express');
const apiRouter = express.Router();
const { eventsRouter } = require('./events.router');
const { ticketsRouter } = require('./tickets.router');
const { usersRouter } = require('./users.router');
const { docsRouter } = require('./docs.router');
const { googleRouter } = require('./google.router.js');

apiRouter.use('/events', eventsRouter);

apiRouter.use('/google', googleRouter);

apiRouter.use('/tickets', ticketsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.get('/', docsRouter);

apiRouter.all('*', (req, res) => {
  const errorMessage = {
    status: 404,
    message: 'Resource not found',
    path: req.originalUrl,
  };
  res.status(404).send(errorMessage);
});

module.exports = { apiRouter };
