const { haversineDistance } = require('../utils/haversineDistance');

exports.getEventsWithinRadius = (currentCoords, events, radius) => {
  return events.filter((event) => {
    const distanceFromLocation = haversineDistance(
      currentCoords,
      event.location.coords
    );
    if (distanceFromLocation <= radius) return event;
  });
};
