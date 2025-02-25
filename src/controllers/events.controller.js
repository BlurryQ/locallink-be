require('dotenv').config();
const {
  selectAllEvents,
  selectEventByID,
  postEvent,
} = require('../models/events.model');
const { formatEventData } = require('../utils/formatEventData');

exports.getAllEvents = async (req, res) => {
  try {
    const data = await selectAllEvents();
    const events = data.documents.map(formatEventData);
    const formattedEvents = { events, total: data.total };
    res.status(200).send(formattedEvents);
  } catch (err) {
    console.error('Error fetching events:', err);
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
    console.error('Error fetching event:', err);
    res.status(400).send({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEventData = await postEvent(eventData);
    const newEvent = formatEventData(newEventData);
    res.status(200).send(newEvent);
  } catch (err) {
    console.error('Error posting event:', err);
    res.status(400).send({ error: err.message });
  }
};
