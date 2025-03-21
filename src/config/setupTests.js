const { seedDatabase } = require('../../db/seeds/seedDatabase');
const { resetDatabase } = require('../../db/seeds/resetDatabase');
const { server } = require('../index');

beforeAll(async () => {
  await resetDatabase();
  //   delay for 3 seconds to allow the database to fully reset
  await new Promise((resolve) => setTimeout(resolve, 500));
  await seedDatabase();
  console.log('✅ Database reset and seeded!');
});

afterAll(() => server.close());
