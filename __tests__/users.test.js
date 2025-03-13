const request = require('supertest');
const { app } = require('../src');

const newUser = {
  email: 'user@four.com',
  password: 'User@04!',
};

describe.only('/users endpoint testing for LocalLink', () => {
  describe('POST /users - posts new user', () => {
    it('201: successfully posts a new user to endpoint and recieves user object back', () => {
      return request(app)
        .post('/users')
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          expect(body).toHaveProperty('id');
          const { id, ...rest } = body;
          expect(rest).toEqual(newUser);
          newUser.id = id;
        });
    });
  });

  describe('GET /users/:userID - retrieves the specified user obj', () => {
    it('200: successfully retrieves the specified user obj', () => {
      return request(app)
        .get('/users/' + newUser.id)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(newUser);
        });
    });
  });

  describe('PATCH /users/:userID - patches the specified user', () => {
    it('200: successfully patches the specified user and retrieves the user obj', () => {
      const email = 'user4@four.com';
      newUser.email = email;
      return request(app)
        .patch('/users/' + newUser.id)
        .send({ email })
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(newUser);
        });
    });
  });

  describe('DELETE /users/:userID - deletes the specified user', () => {
    it('204: successfully deletes the specified user', () => {
      return request(app)
        .delete('/users/' + newUser.id)
        .expect(204)
        .then(({ body }) => {
          expect(body).toEqual({});
        });
    });
  });
});
