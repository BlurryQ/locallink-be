const apiRouter = require('express').Router();

const { eventsRouter } = require('./events.router');
const { ticketsRouter } = require('./tickets.router');

apiRouter.use('/events', eventsRouter);

apiRouter.use('/tickets', ticketsRouter);

module.exports = { apiRouter };
