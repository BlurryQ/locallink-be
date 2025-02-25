const {
  getAllEvents,
  getEventByID,
  createEvent,
} = require('../controllers/events.controller');

const eventsRouter = require('express').Router();

eventsRouter.get('/', getAllEvents);

eventsRouter.get('/:eventID', getEventByID);

eventsRouter.post('/', createEvent);

module.exports = { eventsRouter };
