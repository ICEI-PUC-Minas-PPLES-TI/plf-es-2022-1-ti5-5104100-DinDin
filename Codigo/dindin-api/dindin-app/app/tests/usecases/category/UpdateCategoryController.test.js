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

describe("PUT /category test suite", () => {
  it("should update a category", async () => {
    const mockCategory = {
      description: "teste",
      type: "IN",
      color: "qwe23",
      user_id: 1,
      wallet_id: 1,
    };
    const createdCategory = await Category.create(mockCategory);

    mockCategory.description = "Category Updated";
    mockCategory.color = "1233er";

    const response = await supertest(app)
      .put("/api/Category/" + createdCategory.id)
      .send(mockCategory);

    expect(response.statusCode).toEqual(201);
    expect(response.body.description).toEqual(mockCategory.description);
    expect(response.body.color).toEqual(mockCategory.color);
  });
})