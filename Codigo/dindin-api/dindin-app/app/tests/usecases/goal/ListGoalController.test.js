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
    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('pages');
    expect(response.body).toHaveProperty('goals');
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  })

  it("should list the goals with limit", async () => {
    const response = await supertest(app)
      .get('/api/goal/')
      .send({
        limit: 1
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  })

  it("should list the goals with description search", async () => {
    const response = await supertest(app)
      .get('/api/goal/')
      .send({
        description: "goal"
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  })

  it("should list the goals with asc order id", async () => {
    const response = await supertest(app)
      .get('/api/goal/')
      .send({
        attribute: "id",
        order: "ASC"
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.goals[0].id).toEqual(1);
  })
})
