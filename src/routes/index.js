const apiRouter = require('express').Router();
const { eventsRouter } = require('./events.router');
const { ticketsRouter } = require('./tickets.router');
const docs = require('../../docs.json');

apiRouter.use('/events', eventsRouter);

apiRouter.use('/tickets', ticketsRouter);

apiRouter.use('/', (req, res) => {
  res.status(200).send({ docs });
});

module.exports = { apiRouter };
