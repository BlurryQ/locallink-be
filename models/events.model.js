require('dotenv').config();
const { databases } = require('../appwrite');

exports.selectAllEvents = async () => {
  return await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_EVENTS_TABLE
  );
};

exports.selectEventByID = async (eventID) => {
  return await databases.getDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_EVENTS_TABLE,
    eventID
  );
};
