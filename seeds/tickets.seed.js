require('dotenv').config();
const { databases } = require('../appwrite');

exports.seedTickets = async (res) => {
  const newTicket = {
    event_id: 1,
    owner_id: 1,
    price: 100,
    purchased: '2025-06-12T15:00',
  };

  try {
    return databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_TICKETS_TABLE,
      'unique()',
      newTicket
    );
  } catch (error) {
    console.error('Error posting event', error);
  }
};
