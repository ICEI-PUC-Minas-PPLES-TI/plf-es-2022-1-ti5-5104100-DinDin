const supertest = require('supertest'); // "requester"
require("dotenv").config();

const app = require('../../..');
const { connect, close } = require('../../../database');
const User = require('../../../models/User');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

describe('POST /user test suite', () => {

  it('should create a new user', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: 'Lcs',
        email: `${Math.random()}@protonmail.com`,
        password: 'mySuperSecretPassword'
      });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('user.id');
  })

})
