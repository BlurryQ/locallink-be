require('dotenv').config();
const { databases } = require('../appwrite');

exports.seedEvents = async () => {
  const newEvent = {
    name: 'test',
    start: '2025-06-12T19:00',
    end: '2025-06-12T21:30',
    location: 'here',
    organiser: 1,
    capacity: 50,
    details: 'A test event',
    status: 'Upcoming',
    price: 100,
    image_url: null,
    category: 'test',
  };

  try {
    return databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_EVENTS_TABLE,
      'unique()',
      newEvent
    );
  } catch (error) {
    console.error('Error posting event', error);
  }
};
