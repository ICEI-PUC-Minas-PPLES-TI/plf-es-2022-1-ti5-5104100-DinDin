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

describe("DELETE /goal/:id test suite", () => {

  it("should delete the goal", async () => {
    const mockGoal = {
      description: "goal to find",
      status: "PENDING",
      value: 2000,
      type: "A",
      expire_at: "2030-10-10",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal)

    const response = await supertest(app)
      .delete('/api/goal/' + createdGoal.id)
      .send();


    expect(response.statusCode).toEqual(204);

    const tryToFindGoal = await Goal.findByPk(createdGoal.id);
    expect(tryToFindGoal).toBeNull();
  })

})
