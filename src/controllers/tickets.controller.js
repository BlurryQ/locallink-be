const {
  selectAllTickets,
  selectTicketByID,
} = require('../models/tickets.model');
const { formatTicketData } = require('../utils/formatTicketData');
require('dotenv').config();

exports.getAllTickets = async (req, res) => {
  try {
    const data = await selectAllTickets();
    const tickets = data.documents.map(formatTicketData);
    const formattedTickets = { tickets, total: data.total };
    res.status(200).send(formattedTickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.getTicketByID = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const data = await selectTicketByID(ticketID);
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.error('Error fetching ticket:', err);
    res.status(400).send({ error: err.message });
  }
};
