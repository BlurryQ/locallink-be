exports.formatTicketEvents = (tickets, events) => {
  return tickets.map((ticket, index) => {
    const event = events[index];
    return {
      ticket_id: ticket.id,
      event_id: event.id,
      name: event.name,
      start: event.start,
      end: event.end,
      location: event.location,
      status: event.status,
      image_url: event.image_url,
    };
  });
};
