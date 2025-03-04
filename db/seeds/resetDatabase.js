const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `${__dirname}/../../.env.${ENV}`,
});

const { databases } = require('../../src/config/appwrite');
const { Permission, Role } = require('node-appwrite');
const { eventsAttributes } = require('../attributes/events.attribute');
const { ticketsAttributes } = require('../attributes/tickets.attribute');
const db = process.env.APPWRITE_DATABASE_ID;
const eventsTable = process.env.APPWRITE_EVENTS_TABLE;
const ticketsTable = process.env.APPWRITE_TICKETS_TABLE;

// change to true to see all logs
const debugging = false;

// main function
const resetDatabase = async () => {
  await dropCollections();
  await createCollections();
  await seedAttributes();
  if (debugging) console.log('✅ Database reset!');
};

const dropCollections = async () => {
  try {
    if (debugging) console.log('Dropping collections...');
    await databases.deleteCollection(db, eventsTable);
    if (debugging) console.log('✅ Events dropped!');
    await databases.deleteCollection(db, ticketsTable);
    if (debugging) console.log('✅ Tickets dropped!');
    if (debugging) console.log('✅ Collections dropped! ✅');
  } catch (err) {
    if (debugging) console.error('Error dropping collections:', err);
  }
};

const createCollections = async () => {
  const permissions = [
    Permission.read(Role.any()),
    Permission.write(Role.any()),
    Permission.update(Role.any()),
    Permission.delete(Role.any()),
  ];

  try {
    if (debugging) console.log('Recreating Events collection...');
    await databases.createCollection(db, eventsTable, 'events', permissions);
    if (debugging) console.log('✅ Events collection recreated!');
    await databases.createCollection(db, ticketsTable, 'tickets', permissions);
    if (debugging) console.log('✅ Tickets collection recreated!');

    if (debugging) console.log('✅ All collections recreated! ✅');
  } catch (err) {
    if (debugging) console.error('Error recreating database:', err);
  }
};

const seedAttributes = async () => {
  try {
    if (debugging) console.log('Seeding attributes...');
    await eventsAttributes(databases, db, eventsTable);
    if (debugging) console.log('✅ Event attributes recreated!');
    await ticketsAttributes(databases, db, ticketsTable);
    if (debugging) console.log('✅ Ticket attributes recreated!');
    if (debugging) console.log('✅ All attributes recreated! ✅');
  } catch (err) {
    if (debugging) console.error('Error seeding attributes:', err);
  }
};

// resetDatabase();

module.exports = { resetDatabase };
