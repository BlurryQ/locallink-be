const request = require('supertest');
const { app } = require('../src');
require('jest-sorted');

describe('/tickets/events/:id endpoint testing for LocalLink', () => {
  describe('GET /tickets/events/:owner_id - returns an array of objects containing ticket information', () => {
    it('200: returns an array of ticket objects filtered by "owner_id"', () => {
      return request(app)
        .get('/tickets')
        .then(({ body }) => {
          const userID = body.tickets[0].owner_id;
          return request(app)
            .get('/tickets/events/' + userID)
            .expect(200)
            .then(({ body }) => {
              const tickets = body.tickets;
              expect(Array.isArray(tickets)).toBe(true);
            });
        });
    });
    it('200: returns the appropriate object shape', () => {
      return request(app)
        .get('/tickets')
        .then(({ body }) => {
          const userID = body.tickets[0].owner_id;
          return request(app)
            .get('/tickets/events/' + userID)
            .expect(200)
            .then(({ body }) => {
              const event = body.tickets[0];
              expect(event).toHaveProperty('event_id');
              expect(event).toHaveProperty('start');
              expect(event).toHaveProperty('end');
              expect(event).toHaveProperty('location');
              expect(event).toHaveProperty('status');
              expect(event).toHaveProperty('total_tickets');
            });
        });
    });
    it('200: returns the total of ticket objects correctly (2)', () => {
      return request(app)
        .get('/tickets')
        .then(({ body }) => {
          const userID = body.tickets[0].owner_id;
          return request(app)
            .get('/tickets/events/' + userID)
            .expect(200)
            .then(({ body }) => {
              expect(body.tickets.length).toBe(2);
              expect(body.total).toBe(2);
            });
        });
    });
    it("200: returns empty array if no tickets are found or user doesn't exist", () => {
      return request(app)
        .get('/tickets/events/' + 3)
        .expect(200)
        .then(({ body }) => {
          expect(body.tickets.length).toBe(0);
          expect(body.total).toBe(0);
        });
    });
  });
});
