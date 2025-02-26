const request = require('supertest');
const { app, server } = require('../src');
require('jest-sorted');

const { seedDatabase } = require('../db/seeds/seedDatabase');
const { resetDatabase } = require('../db/seeds/resetDatabase');

beforeAll(async () => {
  await resetDatabase();
  await seedDatabase();
  console.log('✅ Database reset and seeded!');
});
afterAll(() => server.close());

describe('/events endpoint testing for LocalLink', () => {
  describe('GET /events - returns an array of objects containing event information', () => {
    it('200: returns an array', () => {
      return request(app)
        .get('/events')
        .expect(200)
        .then(({ body }) => {
          const events = body.events;
          expect(Array.isArray(events)).toBe(true);
        });
    });
    it('200: returns the appropriate object shape', () => {
      return request(app)
        .get('/events')
        .expect(200)
        .then(({ body }) => {
          const event = body.events[0];
          expect(event).toHaveProperty('id');
          expect(event).toHaveProperty('name');
          expect(event).toHaveProperty('start');
          expect(event).toHaveProperty('end');
          expect(event).toHaveProperty('location');
          expect(event).toHaveProperty('organiser');
          expect(event).toHaveProperty('details');
          expect(event).toHaveProperty('status');
          expect(event).toHaveProperty('price');
          expect(event).toHaveProperty('category');
        });
    });
    it('200: returns the total of event objects correctly (3)', () => {
      return request(app)
        .get('/events')
        .expect(200)
        .then(({ body }) => {
          const totalEvents = body.events.length;
          expect(totalEvents).toBe(3);
        });
    });
    it('200: returns the events array in the order the events start', () => {
      return request(app)
        .get('/events')
        .expect(200)
        .then(({ body }) => {
          const events = body.events;
          events.forEach((event) => {
            event.start = new Date(event.start);
          });
          expect(events).toBeSortedBy('start', { descending: false });
        });
    });
    it('200: returns the events array filtered by category', () => {
      return request(app)
        .get('/events?category=testing')
        .expect(200)
        .then(({ body }) => {
          const events = body.events;
          events.forEach((event) => {
            expect(event.category).toBe('testing');
          });
        });
    });
    it('200: returns the events array filtered by free events', () => {
      return request(app)
        .get('/events?isFree=true')
        .expect(200)
        .then(({ body }) => {
          const events = body.events;
          events.forEach((event) => {
            expect(event.price).toBe(0);
          });
        });
    });
    it('200: returns the events array filtered by location', () => {
      return request(app)
        .get('/events?location=M2 3BF')
        .expect(200)
        .then(({ body }) => {
          expect(true).toBe(false);
        });
    });
    it('200: returns the events array filtered by multiple filters', () => {
      return request(app)
        .get('/events?category=testing&isFree=true')
        .expect(200)
        .then(({ body }) => {
          const events = body.events;
          events.forEach((event) => {
            expect(event.category).toBe('testing');
            expect(event.price).toBe(0);
          });
        });
    });
  });

  describe('POST /events - returns successfully posted object with an id', () => {
    it('201: successfully posts an event to endpoint and recieves article object back', () => {
      const newEvent = {
        name: 'test 3',
        start: '2025-06-14T19:00:00.000+00:00',
        end: '2025-06-14T21:30:00.000+00:00',
        location:
          "{'name': 'The Pub', 'street':'123 Main St','city':'Manchester','postcode':'M2 3AW','country':'UK'}",
        organiser: 2,
        capacity: 100,
        details: 'Tester',
        status: 'Upcoming',
        price: 1000,
        category: 'test',
      };
      return request(app)
        .post('/events')
        .send(newEvent)
        .expect(201)
        .then(({ body }) => {
          return request(app)
            .get('/events/' + body.id)
            .expect(200)
            .then(({ body }) => {
              expect(body).toEqual(expect.objectContaining(newEvent));
              expect(body).toHaveProperty('id');
            });
        });
    });
    it('400: returns error if missing required property', () => {
      const noNameEvent = {
        start: '2025-06-14T19:00:00.000+00:00',
        end: '2025-06-14T21:30:00.000+00:00',
        location:
          "{'name': 'The Pub', 'street':'123 Main St','city':'Manchester','postcode':'M2 3AW','country':'UK'}",
        organiser: 2,
        capacity: 100,
        details: 'Tester',
        status: 'Upcoming',
        price: 1000,
        category: 'test',
      };
      const noCapacityEvent = {
        name: 'New Event',
        start: '2025-06-14T19:00:00.000+00:00',
        end: '2025-06-14T21:30:00.000+00:00',
        location:
          "{'name': 'The Pub', 'street':'123 Main St','city':'Manchester','postcode':'M2 3AW','country':'UK'}",
        organiser: 2,
        details: 'Tester',
        status: 'Upcoming',
        price: 1000,
        category: 'test',
      };
      return request(app)
        .post('/events')
        .send(noCapacityEvent)
        .expect(400)
        .then(({ body }) => {
          const errorMessage = {
            error:
              'Invalid document structure: Missing required attribute "capacity"',
          };
          expect(body).toEqual(errorMessage);
        });
    });
  });
});

describe('/events/:id endpoint testing for LocalLink', () => {
  describe('GET /events/:id - returns an event object containing relevant information', () => {
    it('200: returns correct event object', () => {
      const event = {
        name: 'test 2',
        start: '2025-06-12T19:00:00.000+00:00',
        end: '2025-06-12T21:30:00.000+00:00',
        location:
          "{'name': 'The Pub', 'street':'123 Main St','city':'Manchester','postcode':'M2 3AW','country':'UK'}",
        organiser: 1,
        capacity: 50,
        details: 'Another test event',
        status: 'Upcoming',
        price: 100,
        category: 'test',
      };
      return request(app)
        .get('/events')
        .expect(200)
        .then(({ body }) => {
          const events = body.events;
          return request(app)
            .get('/events/' + events[0].id)
            .expect(200)
            .then(({ body }) => {
              expect(body).toEqual(expect.objectContaining(event));
              expect(body).toHaveProperty('id');
            });
        });
    });
    it('404: return "not found" if invalid ID given', () => {
      return request(app)
        .get('/events/bob')
        .expect(404)
        .then((body) => {
          const errorMessage = {
            error: 'Document with the requested ID could not be found.',
          };
          expect(body.body).toEqual(errorMessage);
          return request(app)
            .get('/events/12345')
            .expect(404)
            .then((body) => {
              const errorMessage = {
                error: 'Document with the requested ID could not be found.',
              };
              expect(body.body).toEqual(errorMessage);
            });
        });
    });
  });
});
