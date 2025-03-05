const {
  selectAllEvents,
  selectEventByID,
  postEvent,
  patchEvent,
  deleteEvent,
} = require('../models/events.model');
const { formatEventData } = require('../utils/formatEventData');
const { getEventsWithinRadius } = require('../utils/getEventsWithinRadius');

exports.getAllEvents = async (req, res) => {
  const { category, lat, long, radius, isFree, recent, organiser, status } =
    req.query;
  const queries = { status, category, organiser, isFree };
  try {
    const data = await selectAllEvents(recent, queries);
    let events = data.documents.map(formatEventData);
    // if location query and all data present
    if (lat && long && radius) {
      const currentCoords = { lat, long };
      events = getEventsWithinRadius(currentCoords, events, radius);
    }
    const total = events.length;
    const allEvents = { events, total };
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
    eventData.location = JSON.stringify(eventData.location);
    const newEventData = await postEvent(eventData);
    const newEvent = formatEventData(newEventData);
    res.status(201).send(newEvent);
  } catch (err) {
    // console.error('Error posting event:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.editEvent = async (req, res) => {
  try {
    const { eventID } = req.params;
    const eventData = req.body;
    eventData.location = JSON.stringify(eventData.location);
    const updatedEventData = await patchEvent(eventID, eventData);
    const updatedEvent = formatEventData(updatedEventData);
    res.status(200).send(updatedEvent);
  } catch (err) {
    // console.error('Error updating event:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.removeEvent = async (req, res) => {
  try {
    const { eventID } = req.params;
    await deleteEvent(eventID);
    res.status(204).send();
  } catch (err) {
    // console.error('Error deleting event:', err);
    res.status(400).send({ error: err.message });
  }
};
