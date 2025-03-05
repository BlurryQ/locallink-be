const request = require('supertest');
const { app } = require('../src');

let events = [];

describe('/events endpoint testing for LocalLink', () => {
  describe('GET /events - returns an array of objects containing ticket information', () => {
    it('200: returns an array', () => {
      return request(app)
        .get('/tickets')
        .expect(200)
        .then(({ body }) => {
          const tickets = body.tickets;
          expect(Array.isArray(tickets)).toBe(true);
        });
    });
    it('200: returns the appropriate object shape', () => {
      return request(app)
        .get('/tickets')
        .expect(200)
        .then(({ body }) => {
          const event = body.tickets[0];
          expect(event).toHaveProperty('id');
          expect(event).toHaveProperty('event_id');
          expect(event).toHaveProperty('owner_id');
          expect(event).toHaveProperty('price');
        });
    });
    it('200: returns the total of ticket objects correctly (3)', () => {
      return request(app)
        .get('/tickets')
        .expect(200)
        .then(({ body }) => {
          expect(body.tickets.length).toBe(3);
          expect(body.total).toBe(3);
        });
    });
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
        .get('/tickets' + '?owner_id=1')
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
        .get('/tickets' + '?owner_id=3')
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.tickets)).toBe(true);
          expect(body).toEqual({ tickets: [], total: 0 });
        });
    });
  });

  describe('POST /tickets - returns successfully posted ticket with an id', () => {
    it('201: returns the posted ticket object with an id', () => {
      const newTicket = {
        event_id: '647f92b0c3a1d',
        owner_id: 2,
        price: 300,
      };
      return request(app)
        .post('/tickets')
        .send(newTicket)
        .expect(201)
        .then(({ body }) => {
          expect(body).toHaveProperty('id');
          expect(body).toHaveProperty('purchased');
          const { id, purchased, ...rest } = body;
          expect(rest).toEqual(newTicket);
        });
    });
    it('400: returns error if missing required property', () => {
      const ticketNoPrice = {
        event_id: 3,
        owner_id: 2,
      };
      return request(app)
        .post('/tickets')
        .send(ticketNoPrice)
        .expect(400)
        .then(({ body }) => {
          const errorMessage = {
            error:
              'Invalid document structure: Missing required attribute "price"',
          };
          expect(body).toEqual(errorMessage);
        });
    });
  });
});

describe('/tickets/:id endpoint testing for LocalLink', () => {
  describe('GET /tickets/:id - returns ticket object from ID', () => {
    it('200: returns correct ticket object', () => {
      request(app)
        .get('/events')
        .then(({ body }) => {
          events = body.events;
        });
      return request(app)
        .get('/tickets')
        .expect(200)
        .then(({ body }) => {
          const ticketID = body.tickets[0].id;
          return request(app)
            .get('/tickets/' + ticketID)
            .expect(200)
            .then(({ body }) => {
              const ticket = {
                event_id: events[2].id,
                owner_id: 1,
                price: 100,
              };
              const { id, purchased, ...rest } = body;
              expect(rest).toEqual(ticket);
            });
        });
    });
    it('404: returns "not found" if invalid ID given', () => {
      return request(app)
        .get('/tickets/' + 'bob')
        .expect(404)
        .then(({ body }) => {
          const errorMessage = {
            error: 'Document with the requested ID could not be found.',
          };
          expect(body).toEqual(errorMessage);
        });
    });
  });
  describe('PATCH /tickets/:id - returns successfully patched ticket object', () => {
    it('200: returns the patched ticket', () => {
      const newPrice = {
        price: 1000,
      };
      return request(app)
        .get('/tickets')
        .expect(200)
        .then(({ body }) => {
          const ticketID = body.tickets[1].id;
          const ticket = body.tickets[1];
          return request(app)
            .patch('/tickets' + `/${ticketID}`)
            .send(newPrice)
            .expect(200)
            .then(({ body }) => {
              expect(body.id).toBe(ticketID);
              expect(body).toHaveProperty('purchased');
              ticket.price = 1000;
              expect(body).toEqual(ticket);
            });
        });
    });
    it('400: returns the patched ticket', () => {
      const newPrice = {
        bob: 'bob',
      };
      return request(app)
        .get('/tickets')
        .expect(200)
        .then(({ body }) => {
          const ticketID = body.tickets[0].id;
          return request(app)
            .patch('/tickets' + `/${ticketID}`)
            .send(newPrice)
            .expect(400)
            .then(({ body }) => {
              expect(body.error).toBe(
                'Invalid document structure: Unknown attribute: "bob"'
              );
            });
        });
    });
  });

  describe('DELETE /tickets/:id - successfully deletes the chosen ticket', () => {
    it('200: successfully deletes the ticket by id', () => {
      return request(app)
        .get('/tickets')
        .expect(200)
        .then(({ body }) => {
          const ticketID = body.tickets[2].id;
          return request(app)
            .delete('/tickets/' + ticketID)
            .expect(204)
            .then((body) => {
              expect(body.body).toEqual({});
              return request(app)
                .get('/tickets' + ticketID)
                .expect(404);
            });
        });
    });
    it('400: error if ID does not exist', () => {
      return request(app)
        .delete('/tickets/' + 'bob')
        .expect(400);
    });
  });
});
