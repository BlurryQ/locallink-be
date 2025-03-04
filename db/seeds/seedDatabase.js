const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `${__dirname}/../../.env.${ENV}`,
});

const { databases } = require('../../src/config/appwrite');
const fs = require('fs');

// change to true to see all logs
const debugging = false;

// main function
const seedCollection = async (collectionID, dataPath) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  for (const item of data) {
    if (item.location) item.location = JSON.stringify(item.location);
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      collectionID,
      'unique()',
      item
    );
  }
};

const seedDatabase = async () => {
  try {
    await seedCollection(
      process.env.APPWRITE_EVENTS_TABLE,
      './db/data/events.json'
    );
    if (debugging) console.log('✅ Events seeded!');
    await seedCollection(
      process.env.APPWRITE_TICKETS_TABLE,
      './db/data/tickets.json'
    );
    if (debugging) console.log('✅ Tickets seeded!');

    if (debugging) console.log('✅ Database seeded! ✅');
  } catch (err) {
    if (debugging) console.error('Error seeding database:', err);
  }
};

// seedDatabase();

module.exports = { seedDatabase };
