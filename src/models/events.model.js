const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `${__dirname}/../../.env.${ENV}`,
});
const { Query } = require('node-appwrite');
const { databases } = require('../config/appwrite');

exports.selectAllEvents = async (category, isFree = false, recent = false) => {
  // return queries in ascending order by default
  const order = recent
    ? Query.orderDesc('$createdAt')
    : Query.orderAsc('start');
  const queries = [order];
  if (category) queries.push(Query.equal('category', category));
  if (isFree) queries.push(Query.equal('price', 0));
  return await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_EVENTS_TABLE,
    queries
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

exports.patchEvent = async (eventID, updatedEvent) => {
  return databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_EVENTS_TABLE,
    eventID,
    updatedEvent
  );
};

exports.deleteEvent = async (eventID) => {
  return databases.deleteDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_EVENTS_TABLE,
    eventID
  );
};
