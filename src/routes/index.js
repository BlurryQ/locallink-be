const apiRouter = require('express').Router();

const { runSeeds } = require('../seeds/index');
const { eventsRouter } = require('./events.router');
const { ticketsRouter } = require('./tickets.router');

apiRouter.use('/events', eventsRouter);

apiRouter.use('/tickets', ticketsRouter);

// TODO: remove this line
apiRouter.get('/seed', runSeeds);

module.exports = { apiRouter };
