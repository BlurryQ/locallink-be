const { getAllTickets } = require('../controllers/tickets.controller');
const ticketsRouter = require('express').Router();

ticketsRouter.get('/', getAllTickets);

module.exports = { ticketsRouter };
