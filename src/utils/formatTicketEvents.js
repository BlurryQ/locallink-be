const { formatEventData } = require('./formatEventData');
const { formatTicketData } = require('./formatTicketData');

exports.formatTicketEvents = (tickets, events) => {
  const filteredData = tickets
    .map((ticket, index) => ({ ticket, event: events[index] }))
    .filter(({ event }) => event !== null);

  const filteredTickets = filteredData.map(({ ticket }) => ticket);
  const filteredEvents = filteredData.map(({ event }) => event);

  const formattedTickets = filteredTickets.map(formatTicketData);
  const formattedEvents = filteredEvents.map(formatEventData);

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
      category: event.category,
    };
  });
};
