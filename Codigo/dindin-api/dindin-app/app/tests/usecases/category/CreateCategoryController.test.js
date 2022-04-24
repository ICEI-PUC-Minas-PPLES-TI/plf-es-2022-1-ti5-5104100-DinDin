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

describe("POST /goal test suite", () => {
  it("should create a new category IN", async () => {
    const response = await supertest(app).post("/api/category").send({
      description: "teste",
      type: "IN",
      color: "qwe23",
      user_id: 1,
      wallet_id: 1,
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("id");
    const createdCategory = await Category.findByPk(parseInt(response.body.id));
    expect(createdCategory.dataValues.type).toEqual("OUT")
  });

  it("should create a new category OUT", async () => {
    const response = await supertest(app).post("/api/category").send({
      description: "teste",
      type: "OUT",
      color: "qwe23",
      user_id: 1,
      wallet_id: 1,
    });
    console.log(response.body)
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("id");
    const createdCategory = await Category.findByPk(parseInt(response.body.id));
    expect(createdCategory.dataValues.type).toEqual("OUT")
  });

  it("should fail validation missing user_id", async () => {
    const response = await supertest(app).post("/api/category").send({
      description: "teste",
      type: "IN",
      color: "qwe23",
      wallet_id: 1,
    });
    expect(response.statusCode).toEqual(422);
  });

  it("should fail validation missing wallet_id", async () => {
    const response = await supertest(app).post("/api/category").send({
      description: "teste",
      type: "IN",
      color: "qwe23",
      user_id: 1,
    });
    expect(response.statusCode).toEqual(422);
  });

  it("should fail validation missing description", async () => {
    const response = await supertest(app).post("/api/category").send({
      type: "OUT",
      color: "qwe23",
      user_id: 1,
      wallet_id: 1,
    });
    expect(response.statusCode).toEqual(422);
  });

  it("should fail validation with big description", async () => {
    const response = await supertest(app).post("/api/category").send({
      description: "teste222222222222222222222dasdasdasdasd",
      type: "OUT",
      color: "qwe23",
      user_id: 1,
      wallet_id: 1,
    });
    expect(response.statusCode).toEqual(422);
  });

  it("should not create a new category with invalid type", async () => {
    const response = await supertest(app).post("/api/category").send({
      description: "test",
      type: "aaaaaaaaaa",
      color: "qwe23",
      user_id: 1,
      wallet_id: 1,
    });
    expect(response.statusCode).toEqual(422);
  });

})