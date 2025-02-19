const express = require('express');
const {
  getAllEvents,
  getEventByID,
} = require('./controllers/events.controller');
const { runSeeds } = require('./seeds/run.seed');
const { getAllTickets } = require('./controllers/tickets.controller');

const app = express();
app.use(express.json());

app.get('/events', getAllEvents);

app.get('/events/:eventID', getEventByID);

app.get('/tickets', getAllTickets);

app.get('/seed', runSeeds);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
