const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `${__dirname}/../../.env.${ENV}`,
});

const { databases } = require('../config/appwrite');

exports.postUser = async (newUser) => {
  return await databases.createDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_USERS_TABLE,
    'unique()',
    newUser
  );
};

exports.selectUserByID = async (userID) => {
  return await databases.getDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_USERS_TABLE,
    userID
  );
};

exports.patchUser = async (userID, update = {}) => {
  return await databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_USERS_TABLE,
    userID,
    update
  );
};

exports.deleteUser = async (userID) => {
  return await databases.deleteDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_USERS_TABLE,
    userID
  );
};
