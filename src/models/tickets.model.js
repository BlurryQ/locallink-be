const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `${__dirname}/../../.env.${ENV}`,
});

const { Query } = require('node-appwrite');
const { databases } = require('../config/appwrite');

exports.selectAllTickets = async (owner_id) => {
  let query = [];
  if (owner_id) {
    query.push(Query.equal('owner_id', Number(owner_id)));
  }
  return await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_TICKETS_TABLE,
    query
  );
};

exports.postTicket = async (newTicket) => {
  return await databases.createDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_TICKETS_TABLE,
    'unique()',
    newTicket
  );
};

exports.selectTicketByID = async (ticketID) => {
  return await databases.getDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_TICKETS_TABLE,
    ticketID
  );
};

exports.patchTicket = async (ticketID, price = {}) => {
  return await databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_TICKETS_TABLE,
    ticketID,
    price
  );
};

exports.deleteTicket = async (ticketID) => {
  return await databases.deleteDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_TICKETS_TABLE,
    ticketID
  );
};
