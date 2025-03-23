const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `${__dirname}/../../.env.${ENV}`,
});
const { Query } = require('node-appwrite');
const { databases } = require('../config/appwrite');
const cron = require('node-cron');

// Function to check and update event statuses
async function updateEventStatuses() {
  try {
    const now = new Date().toISOString(); // Current time in ISO format

    // Fetch events that are still "upcoming" but have passed their end date
    const events = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_EVENTS_TABLE,
      [Query.equal('status', 'upcoming'), Query.lessThan('end', now)]
    );

    // Update each event's status to "past"
    for (const event of events.documents) {
      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_EVENTS_TABLE,
        event.$id, // Event ID
        { status: 'past' } // Update status
      );
      console.log(`Updated event ${event.$id} to "past"`);
    }

    console.log('Event status update completed.');
  } catch (error) {
    console.error('Error updating event statuses:', error);
  }
}

// Schedule the cron job to run every hour
cron.schedule('*/30 * * * *', () => {
  console.log('Running event status check...');
  updateEventStatuses();
});

console.log('Cron job started. It will run every half hour.');
