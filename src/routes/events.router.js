const {
  getAllEvents,
  getEventByID,
  createEvent,
  editEvent,
  removeEvent,
} = require('../controllers/events.controller');

const eventsRouter = require('express').Router();

eventsRouter.get('/', getAllEvents);

eventsRouter.post('/', createEvent);

eventsRouter.get('/:eventID', getEventByID);

eventsRouter.patch('/:eventID', editEvent);

eventsRouter.delete('/:eventID', removeEvent);

module.exports = { eventsRouter };
