require('dotenv').config();
const { databases } = require('../../src/config/appwrite');
const fs = require('fs');

const seedCollection = async (collectionID, dataPath) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  for (const item of data) {
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
    console.log('✅ Events seeded!');
    await seedCollection(
      process.env.APPWRITE_TICKETS_TABLE,
      './db/data/tickets.json'
    );
    console.log('✅ Tickets seeded!');

    console.log('✅ Database seeded! ✅');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

seedDatabase();
