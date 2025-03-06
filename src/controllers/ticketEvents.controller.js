const { selectEventByID } = require('../models/events.model');
const { selectAllTickets } = require('../models/tickets.model');
const { formatTicketEvents } = require('../utils/formatTicketEvents');
const { tallyEventsTickets } = require('../utils/tallyEventsTickets');

exports.getTicketEventsByUserID = async (req, res) => {
  try {
    let { status } = req.query;
    if (!status) status = 'upcoming';
    const { userID } = req.params;
    const tickets = await selectTicketEventsByUserID(userID, status);
    res.status(200).send(tickets);
  } catch (err) {
    // console.error('Error fetching ticket events:', err);
    res.status(400).send({ error: err.message });
  }
};

const selectTicketEventsByUserID = async (userID, status) => {
  // status optional
  // SELECT tickets.*, events.*, count(tickets.event_id) AS total_tickets FROM tickets,
  // JOIN events ON tickets.event_id = events.id
  // WHERE tickets.owner_id = userID
  // GROUP BY ticket.events_id
  const { documents } = await selectAllTickets(userID);
  const ticketEventsPromises = documents.map(async (ticket) => {
    return await selectEventByID(ticket.event_id);
  });

  const ticketEvents = await Promise.all(ticketEventsPromises);
  const formattedTicketEvents = formatTicketEvents(documents, ticketEvents);
  const filteredTickets = formattedTicketEvents.filter(
    (ticket) => ticket.status === status
  );

  const tickets = tallyEventsTickets(filteredTickets);
  return { tickets, total: tickets.length };
};
