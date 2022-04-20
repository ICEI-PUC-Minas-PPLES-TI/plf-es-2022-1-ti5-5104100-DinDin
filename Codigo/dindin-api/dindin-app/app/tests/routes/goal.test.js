const supertest = require('supertest'); // "requester"
require("dotenv").config();

const app = require('../../');
const { connect, close } = require('../../database');
const Goal = require('../../models/Goal');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

describe('testing POST /goal', () => {
  it('should create an A type goal', async () => {
    const mockGoal = {
      description: "my goal",
      value: 2000,
      type: "A",
      expire_at: "2030-10-10",
      wallet_id: 1
    }

    const response = await supertest(app)
      .post('/api/goal')
      .send(mockGoal);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("goal.id");
    const createdGoal = await Goal.findByPk(parseInt(response.body.goal.id));
    expect(createdGoal.status).toEqual("PENDING");
    expect(createdGoal.type).toEqual("A");
  });

  it('should create an B type goal', async () => { // later validate if a B goal is immediatly accomplished when you already have the achivment amount ( or block the creation of it )
    const mockGoal = {
      description: "my goal",
      value: 2000,
      type: "B",
      expire_at: "2030-10-10",
      wallet_id: 1
    }

    const response = await supertest(app)
      .post('/api/goal')
      .send(mockGoal);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("goal.id");
    const createdGoal = await Goal.findByPk(response.body.goal.id);
    expect(createdGoal.status).toEqual("PENDING");
    expect(createdGoal.type).toEqual("B");
  });

  it('should not create a goal that has an unexisting wallet', async () => {
    const mockGoal = {
      description: "my goal",
      value: 2000,
      type: "A",
      expire_at: "2030-10-10",
      wallet_id: 125999002 //unexisting wallet
    }

    const response = await supertest(app)
      .post('/api/goal')
      .send(mockGoal);

    expect(response.statusCode).toEqual(422); // talvez mudar para 409 (not acceptable)?
  });

  it('should not create a goal that has a past limit date', async () => {
    const mockGoal = {
      description: "my goal",
      value: 2000,
      type: "A",
      expire_at: "2020-10-10",
      wallet_id: 1   //unexisting wallet
    }

    const response = await supertest(app)
      .post('/api/goal')
      .send(mockGoal);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation', async () => {
    const failValidationObjects = [
      {
        value: 2000,
        type: "A",
        expire_at: "2030-10-10",
        wallet_id: 1
      }, /* Without description */
      {
        description: "my goal",
        type: "A",
        expire_at: "2030-10-10",
        wallet_id: 1
      }, /* Without value */
      {
        description: "my goal",
        value: 2000,
        expire_at: "2030-10-10",
        wallet_id: 1
      }, /* Without type */
      {
        description: "my goal",
        value: 2000,
        type: "A",
        wallet_id: 1
      }, /* Without expire_at */
      {
        description: "my goal",
        value: 2000,
        type: "A",
        expire_at: "2030-10-10",
      }, /* Without wallet_id */
      {
        description: "1234567890123456789012345678901",
        value: 2000,
        type: "A",
        expire_at: "2030-10-10",
        wallet_id: 1
      }, /* With a big description */
      {
        description: "my goal",
        value: "notANumber",
        type: "A",
        expire_at: "2030-10-10",
        wallet_id: 1
      }, /* Invalid value */
      {
        description: "my goal",
        value: 2000,
        type: "X",
        expire_at: "2030-10-10",
        wallet_id: 1
      }, /* Invalid type */
      {
        description: "my goal",
        value: 2000,
        type: "A",
        expire_at: "notADate",
        wallet_id: 1
      }, /* Invalid date at expire_at*/
      {
        description: "my goal",
        value: 2000,
        type: "A",
        expire_at: "2030-10-10",
        wallet_id: "notAId"
      }, /* Invalid date at wallet_id*/
    ];

    await Promise.all(
      failValidationObjects.map(async (body) => {
        const response = await supertest(app)
          .post('/api/goal')
          .send(body);

        expect(response.statusCode).toEqual(422);
      })
    )

  });
})

describe("testing api route PUT /api/goal", () => {
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

describe("testing API route GET /api/goal", () => {
  it("should list the goals", async () => {
    const response = await supertest(app)
      .get('/api/goal/')
      .send();

    expect(response.statusCode).toEqual(200);
  })
})

describe("testing API route GET /api/goal/:id", () => {
  it("should find and return the goal", async () => {
    const mockGoal = {
      description: "goal to find",
      status: "PENDING",
      value: 2000,
      type: "B",
      expire_at: "2031-12-12T00:00:00.000Z",
      wallet_id: 1
    }
    const createdGoal = await Goal.create(mockGoal)

    const response = await supertest(app)
      .get('/api/goal/' + createdGoal.id)
      .send();

      expect(response.statusCode).toEqual(200);
      expect(response.body.description).toEqual(mockGoal.description)
      expect(response.body.value).toEqual(mockGoal.value)
      expect(response.body.type).toEqual(mockGoal.type)
      expect(response.body.expire_at).toEqual(mockGoal.expire_at)
  })

  it("should not find a goal", async () => {
    const unexistingGoalId = 1999862;
    const response = await supertest(app)
      .get('/api/goal/' + unexistingGoalId)
      .send();

    expect(response.statusCode).toEqual(404);
  })


})

describe("testing API route DELETE /api/goal/:id", () => {

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
