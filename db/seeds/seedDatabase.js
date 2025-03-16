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
  // count is used to assign ids programmatically (eg 1, 2 and 2)
  let eventIdIndex = 0;
  let i = 0;
  for (const item of data) {
    // if event data, stringify location obj
    if (item.location) item.location = JSON.stringify(item.location);
    // if ticket data, match int to string uid
    else if (item.owner_id) {
      // get data from events table and match
      const ticket = await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_EVENTS_TABLE
      );
      item.event_id = ticket.documents[eventIdIndex].$id;

      // get data from users table and match
      const owners = await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERS_TABLE
      );
      item.owner_id =
        i === 2 ? owners.documents[1].$id : owners.documents[0].$id;
    }
    const res = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      collectionID,
      'unique()',
      item
    );
    eventIdIndex = 1;
    i++;
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
      process.env.APPWRITE_USERS_TABLE,
      './db/data/users.json'
    );
    if (debugging) console.log('✅ Users seeded!');

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

if (ENV === 'development') seedDatabase();

module.exports = { seedDatabase };
