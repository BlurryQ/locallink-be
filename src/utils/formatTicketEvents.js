const { formatEventData } = require('./formatEventData');
const { formatTicketData } = require('./formatTicketData');

exports.formatTicketEvents = (tickets, events) => {
  const formattedTickets = tickets.map(formatTicketData);
  const formattedEvents = events.map(formatEventData);

  return formattedTickets.map((ticket, index) => {
    const event = formattedEvents[index];
    return {
      ticket_id: ticket.id,
      event_id: event.id,
      name: event.name,
      start: event.start,
      end: event.end,
      location: event.location,
      status: event.status,
    };
  });
};
