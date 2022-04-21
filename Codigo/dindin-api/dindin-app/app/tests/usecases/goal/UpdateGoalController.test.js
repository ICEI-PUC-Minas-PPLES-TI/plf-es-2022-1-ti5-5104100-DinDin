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

describe("PUT /goal test suite", () => {
  it("should update a goal", async () => {
    const mockGoal = {
      description: "goal to update",
      status: "PENDING",
      value: 2000,
      type: "B",
      expire_at: "2030-10-10",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal);

    mockGoal.description = "goal updated";
    mockGoal.value = 3000;
    mockGoal.type = "A";
    mockGoal.expire_at = "2031-12-12T00:00:00.000Z";

    const response = await supertest(app)
      .put('/api/goal/' + createdGoal.id)
      .send(mockGoal);

    expect(response.statusCode).toEqual(200);
    expect(response.body.goal.description).toEqual(mockGoal.description)
    expect(response.body.goal.value).toEqual(mockGoal.value)
    expect(response.body.goal.type).toEqual(mockGoal.type)
    expect(response.body.goal.expire_at).toEqual(mockGoal.expire_at)

  })
  it("should not update a goal's status", async () => { // status are changed only by trigger events
    const mockGoal = {
      description: "goal to update",
      status: "PENDING",
      value: 2000,
      type: "B",
      expire_at: "2030-10-10",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal)
    mockGoal.status = "FINISHED";
    const response = await supertest(app)
      .put('/api/goal/' + createdGoal.id)
      .send(mockGoal);

    expect(response.statusCode).toEqual(200);
    expect(response.body.goal.status).not.toEqual(mockGoal.status);

  })
})
