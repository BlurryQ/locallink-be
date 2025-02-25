const {
  getAllTickets,
  getTicketByID,
} = require('../controllers/tickets.controller');
const ticketsRouter = require('express').Router();

ticketsRouter.get('/', getAllTickets);

ticketsRouter.get('/:ticketID', getTicketByID);

module.exports = { ticketsRouter };
