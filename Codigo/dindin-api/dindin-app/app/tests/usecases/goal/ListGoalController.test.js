const supertest = require("supertest"); // "requester"
require("dotenv").config();

const app = require("../../..");
const { connect, close } = require("../../../database");

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

describe("GET /goal test suite", () => {
  it("should list the goals", async () => {
    const response = await supertest(app).get("/api/goal/").send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals with limit", async () => {
    const response = await supertest(app).get("/api/goal?limit=1").send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals with asc order id", async () => {
    const response = await supertest(app)
      .get("/api/goal?attribute=id&order=ASC")
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals[0].id).toEqual(1);
  });

  it("should list the goals with desc order id", async () => {
    const response = await supertest(app)
      .get("/api/goal?attribute=id&order=DESC")
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals[0].id).not.toEqual(1);
  });

  it("should list the goals with description search", async () => {
    const response = await supertest(app)
      .get("/api/goal?description=goal 1")
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals with value search", async () => {
    const response = await supertest(app)
      .get("/api/goal?value=50000.55")
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals with status search", async () => {
    const response = await supertest(app)
      .get("/api/goal?status=FINISHED")
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals with type search", async () => {
    const response = await supertest(app).get("/api/goal?type=A").send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals between a expire_at search", async () => {
    const response = await supertest(app)
      .get(
        "/api/goal?expire_at_start=2010-01-01 11:50:00&expire_at_end=2099-01-01 11:50:00"
      )
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals with wallet_id search", async () => {
    const response = await supertest(app).get("/api/goal?wallet_id=1").send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals between a created_at search", async () => {
    const response = await supertest(app)
      .get(
        "/api/goal?created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00"
      )
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals between a updated_at search", async () => {
    const response = await supertest(app)
      .get(
        "/api/goal?updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00"
      )
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals between a deleted_at search", async () => {
    const response = await supertest(app)
      .get(
        "/api/goal?deleted_at_start=2010-01-01 11:50:00&deleted_at_end=2099-01-01 11:50:00"
      )
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });

  it("should list the goals with all filters", async () => {
    const response = await supertest(app)
      .get(
        "/api/goal?page=1&limit=5&attribute=id&order=DESC&description=goal&value=50000.55&status=FINISHED&type=A&expire_at_start=2010-01-01 11:50:00&expire_at_end=2099-01-01 11:50:00&wallet_id=1&created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00&updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00&deleted_at_start=2010-01-01 11:50:00&deleted_at_end=2099-01-01 11:50:00"
      )
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("pages");
    expect(response.body).toHaveProperty("goals");
    expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
  });
});
