const {
  getAllEvents,
  getEventByID,
} = require('../controllers/events.controller');

const eventsRouter = require('express').Router();

eventsRouter.get('/', getAllEvents);

eventsRouter.get('/:eventID', getEventByID);

module.exports = { eventsRouter };
