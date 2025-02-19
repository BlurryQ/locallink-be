exports.formatEventData = (rawData) => {
  return {
    id: rawData.$id,
    name: rawData.name,
    start: rawData.start,
    end: rawData.end,
    location: rawData.location,
    organiser: rawData.organiser,
    capacity: rawData.capacity,
    details: rawData.details,
    status: rawData.status,
    price: rawData.price,
    image_url: rawData.image_url,
    category: rawData.category,
  };
};
