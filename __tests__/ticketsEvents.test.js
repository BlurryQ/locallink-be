const request = require('supertest');
const { app } = require('../src');
require('jest-sorted');

describe('/tickets/events/:id endpoint testing for LocalLink', () => {
  describe('GET /tickets/events/:owner_id - returns an array of objects containing ticket information', () => {
    it('200: returns an array', () => {
      return request(app)
        .get('/tickets/events/1')
        .expect(200)
        .then(({ body }) => {
          const tickets = body.tickets;
          expect(Array.isArray(tickets)).toBe(true);
        });
    });
    it('200: returns the appropriate object shape', () => {
      return request(app)
        .get('/tickets/events/1')
        .expect(200)
        .then(({ body }) => {
          const event = body.tickets[0];
          expect(event).toHaveProperty('event_id');
          expect(event).toHaveProperty('start');
          expect(event).toHaveProperty('end');
          expect(event).toHaveProperty('location');
          expect(event).toHaveProperty('status');
          expect(event).toHaveProperty('image_url');
        });
    });
    it('200: returns the total of ticket objects correctly (3)', () => {
      return request(app)
        .get('/tickets/events/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.tickets.length).toBe(2);
          expect(body.total).toBe(2);
        });
    });
    // TODO fix below
    it("200: returns the ticket objects filtered by 'owner_id'", () => {
      const returnArr = [
        {
          owner_id: 1,
          price: 100,
        },
        {
          owner_id: 1,
          price: 200,
        },
      ];
      return request(app)
        .get('/tickets/events/1' + '?owner_id=1')
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.tickets)).toBe(true);
          expect(body.tickets[0]).toHaveProperty('id');
          expect(body.tickets[0]).toHaveProperty('event_id');
          expect(body.tickets[0]).toHaveProperty('purchased');
          const ticketsWithoutPurchaseDateAndID = body.tickets.map(
            ({ purchased, id, event_id, ...rest }) => rest
          );
          expect(ticketsWithoutPurchaseDateAndID).toEqual(returnArr);
        });
    });
    it("200: returns the ticket objects filtered by 'price'", () => {
      const returnArr = [
        {
          owner_id: 1,
          price: 100,
        },
      ];
      return request(app)
        .get('/tickets/events/1' + '?price=100')
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.tickets)).toBe(true);
          expect(body.tickets[0]).toHaveProperty('id');
          expect(body.tickets[0]).toHaveProperty('event_id');
          expect(body.tickets[0]).toHaveProperty('purchased');
          const ticketsWithoutPurchaseDateAndID = body.tickets.map(
            ({ purchased, id, event_id, ...rest }) => rest
          );
          expect(ticketsWithoutPurchaseDateAndID).toEqual(returnArr);
        });
    });
    it('200: returns empty array if no tickets are found', () => {
      return request(app)
        .get('/tickets/events/1' + '?owner_id=3')
        .expect(200)
        .then(({ body }) => {
          expect(body.tickets.length).toBe(0);
          expect(body.total).toBe(0);
        });
    });
  });
});
