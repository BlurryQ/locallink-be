const {
  selectAllTickets,
  selectTicketByID,
  postTicket,
  patchTicket,
  deleteTicket,
} = require('../models/tickets.model');
const { formatTicketData } = require('../utils/formatTicketData');

exports.getAllTickets = async (req, res) => {
  try {
    const { owner_id } = req.query;
    // owner_id is optional
    const data = await selectAllTickets(owner_id);
    const tickets = data.documents.map(formatTicketData);
    const formattedTickets = { tickets, total: data.total };
    res.status(200).send(formattedTickets);
  } catch (err) {
    // console.error('Error fetching tickets:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const newTicket = req.body;
    const data = await postTicket(newTicket);
    const formattedTicket = formatTicketData(data);
    res.status(201).send(formattedTicket);
  } catch (err) {
    // console.error('Error creating ticket:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.getTicketByID = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const data = await selectTicketByID(ticketID);
    const formattedTicket = formatTicketData(data);
    res.status(200).send(formattedTicket);
  } catch (err) {
    // console.error('Error fetching ticket:', err);
    res.status(404).send({ error: err.message });
  }
};

exports.editTicket = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const ticketData = req.body;
    const data = await patchTicket(ticketID, ticketData);
    const ticket = formatTicketData(data);
    res.status(200).send(ticket);
  } catch (err) {
    // console.error('Error editing ticket:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.removeTicket = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const data = await deleteTicket(ticketID);
    res.status(204).send(data);
  } catch (err) {
    // console.error('Error removing ticket:', err);
    res.status(400).send({ error: err.message });
  }
};
