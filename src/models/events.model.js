require('dotenv').config();
const { Query } = require('node-appwrite');
const { databases } = require('../config/appwrite');

exports.selectAllEvents = async (category, isFree = false) => {
  // return queries in ascending order by default
  const queries = [Query.orderAsc('start')];
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
