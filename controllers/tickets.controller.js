const { selectAllTickets } = require('../models/tickets.model');
require('dotenv').config();

exports.getAllTickets = async (req, res) => {
  try {
    const allTickets = await selectAllTickets();
    res.status(200).send(allTickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(400).json({ error: err.message });
  }
};
