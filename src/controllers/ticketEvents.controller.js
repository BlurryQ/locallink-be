const { selectEventByID } = require('../models/events.model');
const { formatEventData } = require('../utils/formatEventData');
const { selectAllTickets } = require('../models/tickets.model');
const { formatTicketData } = require('../utils/formatTicketData');
const { formatTicketEvents } = require('../utils/formatTicketEvents');

exports.getTicketEvents = async (req, res) => {
  try {
    let { status } = req.query;
    if (!status) status = 'upcoming';
    const { userID } = req.params;

    // model
    const data = await selectAllTickets(userID);
    const AllTickets = data.documents;

    // TODO make eventIDs dynamic when using actual data
    // model
    const eventIDs = ['67c6132a533b305376c9', '67c6132a74b43d27570f'];
    const ticketsEvents = eventIDs.map(async (event) => {
      return await selectEventByID(event);
    });

    Promise.all(ticketsEvents).then((events) => {
      const formattedTickets = AllTickets.map(formatTicketData);
      const formattedEvents = events.map(formatEventData);
      const ticketEvents = formatTicketEvents(
        formattedTickets,
        formattedEvents
      );

      const tickets = ticketEvents.filter((ticket) => ticket.status === status);

      res.status(200).send({ tickets });
    });
  } catch (err) {
    // console.error('Error fetching ticket events:', err);
    res.status(400).send({ error: err.message });
  }
};
