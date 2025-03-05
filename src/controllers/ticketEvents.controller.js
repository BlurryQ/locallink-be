const { selectEventByID } = require('../models/events.model');
const { selectAllTickets } = require('../models/tickets.model');
const { formatTicketEvents } = require('../utils/formatTicketEvents');

exports.getTicketEvents = async (req, res) => {
  try {
    let { status } = req.query;
    if (!status) status = 'upcoming';
    const { userID } = req.params;

    // TODO make eventIDs dynamic when using actual data
    const eventIDs = ['67c6132a533b305376c9', '67c6132a74b43d27570f'];

    const data = await selectAllTickets(userID);
    const allTickets = data.documents;

    // TODO change eventsIDs to allTickets and event to ticket
    const ticketsEventData = eventIDs.map(async (event) => {
      // TODO change to selectEventByID(ticket.event_id)
      return await selectEventByID(event);
    });
    const allEvents = await Promise.all(ticketsEventData);

    const formattedTicketEvents = formatTicketEvents(allTickets, allEvents);

    const tickets = formattedTicketEvents.filter(
      (ticket) => ticket.status === status
    );

    res.status(200).send({ tickets });
  } catch (err) {
    // console.error('Error fetching ticket events:', err);
    res.status(400).send({ error: err.message });
  }
};
