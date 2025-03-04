const request = require('supertest');
const { app, server } = require('../src');
require('jest-sorted');

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
          expect(event).toHaveProperty('createdAt');
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
          expect(body.events.length).toBe(3);
          expect(body.total).toBe(3);
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
        .get('/events?lat=53.480204&long=-2.242407&radius=5')
        .expect(200)
        .then(({ body }) => {
          const returnArr = [
            {
              name: 'test 2',
              start: '2025-06-12T19:00:00.000+00:00',
              end: '2025-06-12T21:30:00.000+00:00',
              location: {
                name: 'The Pub',
                street: '123 Main St',
                city: 'Manchester',
                postcode: 'M2 3AW',
                country: 'UK',
                coords: { lat: 53.48169, long: -2.24089 },
              },
              organiser: 1,
              capacity: 50,
              details: 'Another test event',
              status: 'Upcoming',
              price: 100,
              category: 'test',
            },
            {
              name: 'test',
              start: '2025-06-18T19:00:00.000+00:00',
              end: '2025-06-18T21:30:00.000+00:00',
              location: {
                name: 'The Pub',
                street: '123 Main St',
                city: 'Manchester',
                postcode: 'M2 3AW',
                country: 'UK',
                coords: { lat: 53.48169, long: -2.24089 },
              },
              organiser: 1,
              capacity: 50,
              details: 'A test event',
              status: 'Upcoming',
              price: 100,
              category: 'testing',
            },
          ];
          const eventsWithoutIDsAndCreationDate = body.events.map(
            ({ id, createdAt, ...rest }) => rest
          );
          expect(eventsWithoutIDsAndCreationDate).toEqual(returnArr);
          expect(eventsWithoutIDsAndCreationDate.length).toBe(2);
          expect(body.total).toBe(2);
        });
    });
    it('200: returns the events array ordered by recently added', () => {
      return request(app)
        .get('/events?recent=true')
        .expect(200)
        .then(({ body }) => {
          const events = body.events;
          expect(events).toBeSortedBy('createdAt', { descending: true });
        });
    });
    it('200: returns the events array filtered by organiser', () => {
      return request(app)
        .get('/events?organiser=' + 2)
        .expect(200)
        .then(({ body }) => {
          const events = body.events;
          events.forEach((event) => {
            expect(event.organiser).toBe(2);
          });
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
    it('201: successfully posts an event to endpoint and recieves event object back', () => {
      const newEvent = {
        name: 'test 4',
        start: '2025-06-14T19:00:00.000+00:00',
        end: '2025-06-14T21:30:00.000+00:00',
        location: {
          name: 'The Pub',
          street: '123 Main St',
          city: 'Manchester',
          postcode: 'M2 3AW',
          country: 'UK',
          coords: { lat: 53.48169, long: -2.24089 },
        },
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
              const { id, createdAt, ...eventWithoutIDAndCreationDate } = body;
              expect(eventWithoutIDAndCreationDate).toEqual(newEvent);
              expect(body).toHaveProperty('id');
              expect(body).toHaveProperty('createdAt');
            });
        });
    });
    it('400: returns error if missing required property', () => {
      const noNameEvent = {
        start: '2025-06-14T19:00:00.000+00:00',
        end: '2025-06-14T21:30:00.000+00:00',
        location: {
          name: 'The Pub',
          street: '123 Main St',
          city: 'Liverpool',
          postcode: 'CH41 5LH',
          country: 'UK',
          coords: { lat: 53.39047, long: -3.00847 },
        },
        organiser: 2,
        capacity: 100,
        details: 'Tester',
        status: 'Upcoming',
        price: 1000,
        category: 'test',
      };
      noNameEvent.location = JSON.stringify(noNameEvent.location);
      const noCapacityEvent = {
        name: 'New Event',
        start: '2025-06-14T19:00:00.000+00:00',
        end: '2025-06-14T21:30:00.000+00:00',
        location: {
          name: 'The Pub',
          street: '123 Main St',
          city: 'Liverpool',
          postcode: 'CH41 5LH',
          country: 'UK',
          coords: { lat: 53.39047, long: -3.00847 },
        },
        organiser: 2,
        details: 'Tester',
        status: 'Upcoming',
        price: 1000,
        category: 'test',
      };
      noCapacityEvent.location = JSON.stringify(noCapacityEvent.location);
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
});

describe('/events/:id endpoint testing for LocalLink', () => {
  describe('GET /events/:id - returns an event object containing relevant information', () => {
    it('200: returns correct event object', () => {
      const event = {
        name: 'test 2',
        start: '2025-06-12T19:00:00.000+00:00',
        end: '2025-06-12T21:30:00.000+00:00',
        location: {
          name: 'The Pub',
          street: '123 Main St',
          city: 'Manchester',
          postcode: 'M2 3AW',
          country: 'UK',
          coords: {
            lat: 53.48169,
            long: -2.24089,
          },
        },
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
              expect(body).toHaveProperty('createdAt');
            });
        });
    });
    it('404: return "not found" if invalid ID given', () => {
      return request(app)
        .get('/events/bob')
        .expect(404)
        .then(({ body }) => {
          const errorMessage = {
            error: 'Document with the requested ID could not be found.',
          };
          expect(body).toEqual(errorMessage);
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
  describe('PATCH /events/:id - returns successfully patched object', () => {
    it('200: successfully patches an event to endpoint and recieves amended event object back', () => {
      return request(app)
        .get('/events')
        .expect(200)
        .then(({ body }) => {
          const id = body.events[2].id;
          return request(app)
            .patch('/events/' + id)
            .send({ name: 'Test 4: CAPS' })
            .expect(200)
            .then(({ body }) => {
              expect(body.name).toBe('Test 4: CAPS');
              return request(app)
                .get('/events/')
                .expect(200)
                .then(({ body }) => {
                  const events = body.events;
                  expect(events[2].name).toBe('Test 4: CAPS');
                });
            });
        });
    });
    it('400: errors if properties sent that do not exist', () => {
      return request(app)
        .get('/events')
        .expect(200)
        .then(({ body }) => {
          const id = body.events[2].id;
          return request(app)
            .patch('/events/' + id)
            .send({ bob: 'Bob' })
            .expect(400)
            .then(({ body }) => {
              expect(body.error).toBe(
                'Invalid document structure: Unknown attribute: "bob"'
              );
            });
        });
    });
  });

  describe('DELETE /events/:id - successfully deletes the chosen event', () => {
    it('204: successfully deletes an event by ID', () => {
      return request(app)
        .get('/events')
        .expect(200)
        .then(({ body }) => {
          const id = body.events[2].id;
          return request(app)
            .delete('/events/' + id)
            .expect(204)
            .then((body) => {
              expect(body.body).toEqual({});
              return request(app)
                .get('/events' + id)
                .expect(404);
            });
        });
    });
    it('400: errors if ID does not exist', () => {
      return request(app)
        .delete('/events/' + '67c5a1f06f21c497d5da')
        .expect(400);
    });
  });
});
