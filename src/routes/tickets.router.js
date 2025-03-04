const { getTicketEvents } = require('../controllers/ticketEvents.controller');
const {
  getAllTickets,
  getTicketByID,
  createTicket,
  editTicket,
  removeTicket,
} = require('../controllers/tickets.controller');
const ticketsRouter = require('express').Router();

ticketsRouter.get('/', getAllTickets);

ticketsRouter.post('/', createTicket);

ticketsRouter.get('/:ticketID', getTicketByID);

ticketsRouter.patch('/:ticketID', editTicket);

ticketsRouter.delete('/:ticketID', removeTicket);

ticketsRouter.get('/events/:userID', getTicketEvents);

ticketsRouter.get('/events/:userID', getTicketEvents);

module.exports = { ticketsRouter };
