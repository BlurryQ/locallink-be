require('dotenv').config();
const {
  selectAllEvents,
  selectEventByID,
  postEvent,
} = require('../models/events.model');
const { formatEventData } = require('../utils/formatEventData');
const { haversineDistance } = require('../utils/haversineDistance');

exports.getAllEvents = async (req, res) => {
  const { category, lat, long, radius, isFree } = req.query;
  try {
    const data = await selectAllEvents(category, isFree);
    let events = data.documents.map(formatEventData);
    // if location query and all data present
    // TODO abstraction function
    if (lat && long && radius) {
      const currentCoords = { lat, long };
      events = events.filter((event) => {
        event.location = JSON.parse(event.location);
        const distanceFromLocation = haversineDistance(
          currentCoords,
          event.location.coords
        );
        if (distanceFromLocation <= radius) return event;
      });
    }
    const allEvents = { events, total: data.total };
    res.status(200).send(allEvents);
  } catch (err) {
    // console.error('Error fetching events:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.getEventByID = async (req, res) => {
  const { eventID } = req.params;
  try {
    const data = await selectEventByID(eventID);
    const event = formatEventData(data);
    res.status(200).send(event);
  } catch (err) {
    // console.error('Error fetching event:', err);
    res.status(404).send({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEventData = await postEvent(eventData);
    const newEvent = formatEventData(newEventData);
    res.status(201).send(newEvent);
  } catch (err) {
    // console.error('Error posting event:', err);
    res.status(400).send({ error: err.message });
  }
};
