require('dotenv').config();
const { selectAllEvents, selectEventByID } = require('../models/events.model');

exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await selectAllEvents();
    res.status(200).send(allEvents);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.getEventByID = async (req, res) => {
  const { eventID } = req.params;
  try {
    const event = await selectEventByID(eventID);
    res.status(200).send(event);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(400).json({ error: err.message });
  }
};
