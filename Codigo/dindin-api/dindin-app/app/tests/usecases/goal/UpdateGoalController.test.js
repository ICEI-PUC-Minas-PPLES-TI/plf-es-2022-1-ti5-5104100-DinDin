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
      value: 2000,
      type: "B",
      expire_at: "2030-01-01T14:50:00.000Z",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal);

    mockGoal.description = "goal updated";
    mockGoal.value = 3000;
    mockGoal.type = "A";
    mockGoal.expire_at = "2040-01-01T14:50:00.000Z";
    mockGoal.wallet_id = 2;

    const response = await supertest(app)
      .put('/api/goal/' + createdGoal.id)
      .send(mockGoal);

    expect(response.statusCode).toEqual(200);
    expect(response.body.goal.description).toEqual(mockGoal.description)
    expect(response.body.goal.value).toEqual(mockGoal.value)
    expect(response.body.goal.type).toEqual(mockGoal.type)
    expect(response.body.goal.expire_at).toEqual(mockGoal.expire_at)
    expect(response.body.goal.wallet_id).toEqual(mockGoal.wallet_id)
  })

  it("should not update a goal's status", async () => { // status are changed only by trigger events
    const mockGoal = {
      description: "goal to update",
      value: 2000,
      type: "B",
      expire_at: "2030-01-01T14:50:00.000Z",
      wallet_id: 1
    } /* Start with PENDING status */
    const createdGoal = await Goal.create(mockGoal)

    mockGoal.status = "FINISHED";

    const response = await supertest(app)
      .put('/api/goal/' + createdGoal.id)
      .send(mockGoal);

    expect(response.statusCode).toEqual(200);
    expect(response.body.goal.status).not.toEqual(mockGoal.status);

  })

  it("should update only description", async () => {
    const mockGoal = {
      description: "goal to update",
      value: 2000,
      type: "B",
      expire_at: "2030-01-01T14:50:00.000Z",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal);

    mockGoal.description = "goal updated 1";

    const response = await supertest(app)
      .put('/api/goal/' + createdGoal.id)
      .send(mockGoal);

    expect(response.statusCode).toEqual(200);
    expect(response.body.goal.description).toEqual(mockGoal.description)
    expect(response.body.goal.value).toEqual(mockGoal.value)
    expect(response.body.goal.type).toEqual(mockGoal.type)
    expect(response.body.goal.expire_at).toEqual(mockGoal.expire_at)
    expect(response.body.goal.wallet_id).toEqual(mockGoal.wallet_id)
  })

  it("should update only value", async () => {
    const mockGoal = {
      description: "goal to update",
      value: 2000,
      type: "B",
      expire_at: "2030-01-01T14:50:00.000Z",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal);

    mockGoal.value = 3000;

    const response = await supertest(app)
      .put('/api/goal/' + createdGoal.id)
      .send(mockGoal);

    expect(response.statusCode).toEqual(200);
    expect(response.body.goal.description).toEqual(mockGoal.description)
    expect(response.body.goal.value).toEqual(mockGoal.value)
    expect(response.body.goal.type).toEqual(mockGoal.type)
    expect(response.body.goal.expire_at).toEqual(mockGoal.expire_at)
    expect(response.body.goal.wallet_id).toEqual(mockGoal.wallet_id)
  })

  it("should update only type", async () => {
    const mockGoal = {
      description: "goal to update",
      value: 2000,
      type: "B",
      expire_at: "2030-01-01T14:50:00.000Z",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal);

    mockGoal.type = "A";

    const response = await supertest(app)
      .put('/api/goal/' + createdGoal.id)
      .send(mockGoal);

    expect(response.statusCode).toEqual(200);
    expect(response.body.goal.description).toEqual(mockGoal.description)
    expect(response.body.goal.value).toEqual(mockGoal.value)
    expect(response.body.goal.type).toEqual(mockGoal.type)
    expect(response.body.goal.expire_at).toEqual(mockGoal.expire_at)
    expect(response.body.goal.wallet_id).toEqual(mockGoal.wallet_id)
  })

  it("should update only expire_at", async () => {
    const mockGoal = {
      description: "goal to update",
      value: 2000,
      type: "B",
      expire_at: "2030-01-01T14:50:00.000Z",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal);

    mockGoal.expire_at = "2040-01-01T14:50:00.000Z";

    const response = await supertest(app)
      .put('/api/goal/' + createdGoal.id)
      .send(mockGoal);

    expect(response.statusCode).toEqual(200);
    expect(response.body.goal.description).toEqual(mockGoal.description)
    expect(response.body.goal.value).toEqual(mockGoal.value)
    expect(response.body.goal.type).toEqual(mockGoal.type)
    expect(response.body.goal.expire_at).toEqual(mockGoal.expire_at)
    expect(response.body.goal.wallet_id).toEqual(mockGoal.wallet_id)
  })

  it("should update only wallet_id", async () => {
    const mockGoal = {
      description: "goal to update",
      value: 2000,
      type: "B",
      expire_at: "2030-01-01T14:50:00.000Z",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal);

    mockGoal.wallet_id = 2;

    const response = await supertest(app)
      .put('/api/goal/' + createdGoal.id)
      .send(mockGoal);

    expect(response.statusCode).toEqual(200);
    expect(response.body.goal.description).toEqual(mockGoal.description)
    expect(response.body.goal.value).toEqual(mockGoal.value)
    expect(response.body.goal.type).toEqual(mockGoal.type)
    expect(response.body.goal.expire_at).toEqual(mockGoal.expire_at)
    expect(response.body.goal.wallet_id).toEqual(mockGoal.wallet_id)
  })

  it('should not create a goal that has an unexisting wallet', async () => {
    const mockGoal = {
      description: "my goal",
      value: 2000,
      type: "A",
      expire_at: "2030-10-10",
      wallet_id: 125999002 //unexisting wallet
    }

    const response = await supertest(app)
      .put('/api/goal/1')
      .send(mockGoal);

    expect(response.statusCode).toEqual(422);
  });

  it('should not create a goal that has a past limit date', async () => {
    const mockGoal = {
      description: "my goal",
      value: 2000,
      type: "A",
      expire_at: "2020-10-10",
      wallet_id: 1
    }

    const response = await supertest(app)
      .put('/api/goal/1')
      .send(mockGoal);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with a big description ', async () => {
    const mockGoal = {
      description: "1234567890123456789012345678901",
      value: 2000,
      type: "A",
      expire_at: "2030-10-10",
      wallet_id: 1
    }

    const response = await supertest(app)
      .put('/api/goal/1')
      .send(mockGoal);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with a invalid value', async () => {
    const mockGoal = {
      description: "my goal",
      value: "notANumber",
      type: "A",
      expire_at: "2030-10-10",
      wallet_id: 1
    }

    const response = await supertest(app)
      .put('/api/goal/1')
      .send(mockGoal);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with a invalid type', async () => {
    const mockGoal = {
      description: "my goal",
      value: 2000,
      type: "X",
      expire_at: "2030-10-10",
      wallet_id: 1
    }

    const response = await supertest(app)
      .put('/api/goal/1')
      .send(mockGoal);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with a invalid expire_at', async () => {
    const mockGoal = {
      description: "my goal",
      value: 2000,
      type: "A",
      expire_at: "notADate",
      wallet_id: 1
    }

    const response = await supertest(app)
      .put('/api/goal/1')
      .send(mockGoal);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with a invalid wallet_id', async () => {
    const mockGoal = {
      description: "my goal",
      value: 2000,
      type: "A",
      expire_at: "2030-10-10",
      wallet_id: "notAId"
    }

    const response = await supertest(app)
      .put('/api/goal/1')
      .send(mockGoal);

    expect(response.statusCode).toEqual(422);
  })
})