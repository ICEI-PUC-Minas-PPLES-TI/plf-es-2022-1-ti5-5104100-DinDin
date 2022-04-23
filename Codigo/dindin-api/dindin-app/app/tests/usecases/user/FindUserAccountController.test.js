const supertest = require('supertest'); // "requester"
require("dotenv").config();

const app = require('../../..');
const { connect, close } = require('../../../database');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

describe('GET /user test suite', () => {
  it('should show a user /api/user/1', async () => {
    const response = await supertest(app).get('/api/user/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
    expect(response.body).toHaveProperty('deleted_at');
  });
})
