const supertest = require('supertest'); // "requester"
require("dotenv").config();

const app = require('../../..');
const { connect, close } = require('../../../database');
const Category = require('../../../models/Category');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

describe("GET /category/:id test suite", () => {
  it("should find and return the category", async () => {
    const mockCategory = {
      description: "teste",
      type: "IN",
      color: "qwe23",
      user_id: 1,
      wallet_id: 1,
    };
    const createdCategory = await Category.create(mockCategory);

    const response = await supertest(app)
      .get("/api/category/" + createdCategory.id)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.description).toEqual(mockCategory.description);
    expect(response.body.type).toEqual(mockCategory.type);
  });

  it("should not find a category", async () => {
    const unexistingCategoryId = 987654321;
    const response = await supertest(app)
      .get("/api/category/" + unexistingCategoryId)
      .send();

    expect(response.statusCode).toEqual(404);
  });

  it("should fail when trying to find category with invalid id", async () => {
    let invalidId = 0;
    let response = await supertest(app)
      .get("/api/category/" + invalidId)
      .send();
    expect(response.statusCode).toEqual(500);

    invalidId = -1;
    response = await supertest(app)
      .get("/api/category/" + invalidId)
      .send();
    expect(response.statusCode).toEqual(500);

    invalidId = null;
    response = await supertest(app)
      .get("/api/category/" + invalidId)
      .send();
    expect(response.statusCode).toEqual(500);

    invalidId = undefined;
    response = await supertest(app)
      .get("/api/category/" + invalidId)
      .send();
    expect(response.statusCode).toEqual(500);
  });
})