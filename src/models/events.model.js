require('dotenv').config();
const { databases } = require('../config/appwrite');
const { formatEventData } = require('../utils/formatEventData');

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

exports.postEvent = async (newEvent) => {
  return databases.createDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_EVENTS_TABLE,
    'unique()',
    newEvent
  );
};
