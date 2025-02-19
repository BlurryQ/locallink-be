const { seedEvents } = require('./events.seed');
const { seedTickets } = require('./tickets.seed');

exports.runSeeds = async (req, res) => {
  try {
    await seedEvents();
    await seedTickets();
    res.status(200).send({ status: 'seeding succeeded' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
