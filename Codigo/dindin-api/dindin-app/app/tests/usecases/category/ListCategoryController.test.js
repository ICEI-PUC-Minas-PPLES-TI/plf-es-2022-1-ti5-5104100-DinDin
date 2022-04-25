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

describe("GET /category test suite", () => {
    it("should list the categories", async () => {
        const response = await supertest(app).get("/api/category/").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories with limit", async () => {
        const response = await supertest(app).get("/api/category/").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories with asc order id", async () => {
        const response = await supertest(app)
            .get("/api/category?attribute=id&order=ASC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories[0].id).toEqual("1");
    });

    it("should list the categories with desc order id", async () => {
        const response = await supertest(app)
            .get("/api/category?attribute=id&order=DESC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories[0].id).not.toEqual(1);
    });

    it("should list the categories with description search", async () => {
        const response = await supertest(app)
            .get("/api/category?description=Culture")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });
    it("should list the categories with type search", async () => {
        const response = await supertest(app)
            .get("/api/category?type=IN")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories with wallet_id search", async () => {
        const response = await supertest(app)
            .get("/api/category?wallet_id=1")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories between a created_at search", async () => {
        const response = await supertest(app)
            .get(
                "/api/category?created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00"
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories between a updated_at search", async () => {
        const response = await supertest(app)
            .get(
                "/api/category?updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00"
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories with all filters", async () => {
        const response = await supertest(app)
            .get(
                "/api/category?page=1&limit=5&attribute=id&order=DESC&description=culture&type=IN&wallet_id=1&created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00&updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00"
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });
});
