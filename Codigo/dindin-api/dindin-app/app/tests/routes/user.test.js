const supertest = require('supertest'); // "requester"
require("dotenv").config();

const apiUrl = `${process.env.NODE_APP_HOST}:${process.env.NODE_PUBLIC_PORT}`;

describe('User API', () => {
  it('should show a user /api/user/1', async () => {
    const response = await supertest(apiUrl).get('/api/user/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('id');
  })
})

it('should create a new user', async () => {
  const response = await supertest(apiUrl)
      .post('/api/user')
      .send({
          name: 'Lcs',
          email: `${Math.random()}@protonmail.com`,
          password: 'mySuperSecretPassword'
      });
  expect(response.statusCode).toEqual(201);
  expect(response.body).toHaveProperty('user.id');
})
