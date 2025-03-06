exports.tallyEventsTickets = (tickets) => {
  const ticketsTallied = {};

  for (const ticket of tickets) {
    const { event_id } = ticket;
    if (!ticketsTallied[event_id])
      ticketsTallied[event_id] = { ...ticket, total_tickets: 1 };
    else ticketsTallied[event_id].total_tickets++;
  }

  return Object.values(ticketsTallied);
};
