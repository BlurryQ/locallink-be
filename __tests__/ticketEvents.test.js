const request = require('supertest');
const { app } = require('../src');
require('jest-sorted');

describe.only('/tickets/events/:id endpoint testing for LocalLink', () => {
  describe('GET /tickets/events/:id - returns an array of ticket objects with event details for a specific event', () => {
    it('200: returns an array of ticket objects for a specific event', () => {
      return request(app)
        .get('/tickets/events/' + 1)
        .expect(200)
        .then(({ body }) => {
          const tickets = body.tickets;
          expect(Array.isArray(tickets)).toBe(true);
          expect(tickets.length).toBe(2);
          expect(body.total).toBe(2);
        });
    });
    it('200: returns the appropriate object shape', () => {
      return request(app)
        .get('/tickets/events/' + 1)
        .expect(200)
        .then(({ body }) => {
          const ticket = body.tickets[0];
          const result = {
            owner_id: 1,
            price: 200,
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
            quantity: 2,
            status: 'Upcoming',
            category: 'test',
          };
          expect(ticket).toHaveProperty('ticket_id');
          expect(ticket).toHaveProperty('event_id');
          expect(ticket).toHaveProperty('purchased');
          expect(ticket).toEqual(expect.objectContaining(result));
        });
    });
    it('200: returns empty array if no tickets are found for the event', () => {
      return request(app)
        .get('/tickets/events/' + 3)
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.tickets)).toBe(true);
          expect(body).toEqual({ tickets: [], total: 0 });
        });
    });
  });
});
