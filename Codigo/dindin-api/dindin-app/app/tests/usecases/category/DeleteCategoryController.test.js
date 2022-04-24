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

describe("DELETE /category:id test suite", () => {
  it("should delete a category", async () => {
    const mockCategory = {
      description: "teste",
      type: "IN",
      color: "qwe23",
      user_id: 1,
      wallet_id: 1,
    };
    const createdCategory = await Category.create(mockCategory);

    const response = await supertest(app)
      .delete("/api/category/" + createdCategory.id)
      .send();

    expect(response.statusCode).toEqual(201);

    const tryToFindCategory = await Category.findByPk(createdCategory.id);
    expect(tryToFindCategory).toBeNull();
  });

  it("should not find a non-existent category when trying to delete it", async () => {
    const nonExistentId = 987654321;
    const response = await supertest(app)
      .delete("/api/category/" + nonExistentId)
      .send();

    expect(response.statusCode).toEqual(404);

    const tryToFindCategory = await Category.findByPk(nonExistentId);
    expect(tryToFindCategory).toBeNull();
  });

  it("should fail when trying to delete Category with invalid id", async () => {
    let invalidId = 0;
    let response = await supertest(app)
      .delete("/api/category/" + invalidId)
      .send();

    expect(response.statusCode).toEqual(500);

    invalidId = -1;
    response = await supertest(app)
      .delete("/api/category/" + invalidId)
      .send();

    expect(response.statusCode).toEqual(500);

    invalidId = null;
    response = await supertest(app)
      .delete("/api/category/" + invalidId)
      .send();

    expect(response.statusCode).toEqual(500);

    invalidId = undefined;
    response = await supertest(app)
      .delete("/api/category/" + invalidId)
      .send();

    expect(response.statusCode).toEqual(500);
  });
})