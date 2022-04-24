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
  it("should create an A type goal", async () => {
    expect("A").toEqual("A");
  })
})