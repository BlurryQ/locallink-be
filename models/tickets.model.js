require('dotenv').config();
const { databases } = require('../appwrite');

exports.selectAllTickets = async () => {
  return await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_TICKETS_TABLE
  );
};
