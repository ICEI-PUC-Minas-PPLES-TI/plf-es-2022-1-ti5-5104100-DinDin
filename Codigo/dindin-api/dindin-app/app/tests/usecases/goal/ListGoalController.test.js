const supertest = require('supertest'); // "requester"
require("dotenv").config();

const app = require('../../..');
const { connect, close } = require('../../../database');
const Goal = require('../../../models/Goal');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

describe("GET /goal test suite", () => {
  it("should list the goals", async () => {
    const response = await supertest(app)
      .get('/api/goal/')
      .send();

    expect(response.statusCode).toEqual(200);
  })
})
