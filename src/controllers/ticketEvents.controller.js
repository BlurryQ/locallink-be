const { selectEventByID } = require('../models/events.model');
const { selectAllTickets } = require('../models/tickets.model');
const { formatTicketEvents } = require('../utils/formatTicketEvents');

const totalEventsTickets = (arr) => {
  // clone arr
  const clone = arr;
  console.log(clone);

  // sort data

  // reverse iterate over data and check if event IDs match

  // if match total tickets ++

  // remove ticket obj

  // return arr
};

const getTicketEventsByUserID = async (userID, status) => {
  // status optional
  // SELECT tickets.*, events.*, count(tickets.event_id) AS total_tickets FROM tickets,
  // JOIN events ON tickets.event_id = events.id
  // WHERE tickets.owner_id = userID
  // GROUP BY ticket.events_id
  const { documents } = await selectAllTickets(userID);
  const ticketsOnly = documents.map(async (ticket) => {
    return await selectEventByID(ticket.event_id);
  });
  const ticketEvents = await Promise.all(ticketsOnly);
  const formattedTicketEvents = formatTicketEvents(ticketsOnly, ticketEvents);
  const tickets = formattedTicketEvents.filter(
    (ticket) => ticket.status === status
  );

  totalEventsTickets(tickets);

  return { tickets, total: tickets.length };
};

exports.getTicketEvents = async (req, res) => {
  try {
    let { status } = req.query;
    if (!status) status = 'upcoming';
    const { userID } = req.params;
    const tickets = await getTicketEventsByUserID(userID, status);
    res.status(200).send(tickets);
  } catch (err) {
    // console.error('Error fetching ticket events:', err);
    res.status(400).send({ error: err.message });
  }
};

// TODO add total tickets to event ( eg 3 tickets for event 1)
