require('dotenv').config();
const { databases } = require('../../src/config/appwrite');
const { Permission, Role } = require('node-appwrite');
const { eventsAttributes } = require('../attributes/events.attribute');
const { ticketsAttributes } = require('../attributes/tickets.attribute');
const db = process.env.APPWRITE_DATABASE_ID;
const eventsTable = process.env.APPWRITE_EVENTS_TABLE;
const ticketsTable = process.env.APPWRITE_TICKETS_TABLE;

const resetDatabase = async () => {
  await dropCollections();
  await recreateCollections();
  await seedAttributes();
};

const dropCollections = async () => {
  try {
    console.log('Dropping collections...');
    await databases.deleteCollection(db, eventsTable);
    console.log('✅ Events dropped!');
    await databases.deleteCollection(db, ticketsTable);
    console.log('✅ Tickets dropped!');
    console.log('✅ Collections dropped! ✅');
  } catch (err) {
    console.error('Error dropping collections:', err);
  }
};

const recreateCollections = async () => {
  const permissions = [
    Permission.read(Role.any()),
    Permission.write(Role.any()),
    Permission.update(Role.any()),
    Permission.delete(Role.any()),
  ];

  try {
    console.log('Recreating Events collection...');
    await databases.createCollection(db, eventsTable, 'events', permissions);
    console.log('✅ Events collection recreated!');
    await databases.createCollection(db, ticketsTable, 'tickets', permissions);
    console.log('✅ Tickets collection recreated!');

    console.log('✅ All collections recreated! ✅');
  } catch (err) {
    console.error('Error recreating database:', err);
  }
};

const seedAttributes = async () => {
  try {
    console.log('Seeding attributes...');
    await eventsAttributes(databases, db, eventsTable);
    console.log('✅ Event attributes recreated!');
    await ticketsAttributes(databases, db, ticketsTable);
    console.log('✅ Ticket attributes recreated!');
    console.log('✅ All attributes recreated! ✅');
  } catch (err) {
    console.error('Error seeding attributes:', err);
  }
};

resetDatabase();
