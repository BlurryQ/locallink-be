const express = require('express');
const apiRouter = express.Router();
const { eventsRouter } = require('./events.router');
const { ticketsRouter } = require('./tickets.router');
const { docsRouter } = require('./docs.router');

apiRouter.use('/events', eventsRouter);

apiRouter.use('/tickets', ticketsRouter);

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
