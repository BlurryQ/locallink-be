exports.formatTicketData = (rawData) => {
  return {
    id: rawData.$id,
    event_id: rawData.event_id,
    owner_id: rawData.owner_id,
    price: rawData.price,
    purchased: rawData.$createdAt,
  };
};
