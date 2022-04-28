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

describe("GET /wallet test suite", () => {
    it("should list the wallets", async () => {
        const response = await supertest(app).get("/api/wallet/").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the wallets with limit", async () => {
        const response = await supertest(app).get("/api/wallet?limit=1").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the wallets with asc order id", async () => {
        const response = await supertest(app)
            .get("/api/wallet?attribute=id&order=ASC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets[0].id).toEqual("1");
    });

    it("should list the wallets with desc order id", async () => {
        const response = await supertest(app)
            .get("/api/wallet?attribute=id&order=DESC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets[0].id).not.toEqual(1);
    });

    // it("should list the wallets with description search", async () => {
    //     const response = await supertest(app)
    //         .get("/api/wallet?description=wallet 1")
    //         .send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets with value search", async () => {
    //     const response = await supertest(app)
    //         .get("/api/wallet?value=50000.55")
    //         .send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets with status search", async () => {
    //     const response = await supertest(app)
    //         .get("/api/wallet?status=FINISHED")
    //         .send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets with type search", async () => {
    //     const response = await supertest(app).get("/api/wallet?type=A").send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets between a expire_at search", async () => {
    //     const response = await supertest(app)
    //         .get(
    //             "/api/wallet?expire_at_start=2010-01-01 11:50:00&expire_at_end=2099-01-01 11:50:00"
    //         )
    //         .send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets with wallet_id search", async () => {
    //     const response = await supertest(app)
    //         .get("/api/wallet?wallet_id=1")
    //         .send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets between a created_at search", async () => {
    //     const response = await supertest(app)
    //         .get(
    //             "/api/wallet?created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00"
    //         )
    //         .send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets between a updated_at search", async () => {
    //     const response = await supertest(app)
    //         .get(
    //             "/api/wallet?updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00"
    //         )
    //         .send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets between a deleted_at search", async () => {
    //     const response = await supertest(app)
    //         .get(
    //             "/api/wallet?deleted_at_start=2010-01-01 11:50:00&deleted_at_end=2099-01-01 11:50:00"
    //         )
    //         .send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets with all filters", async () => {
    //     const response = await supertest(app)
    //         .get(
    //             "/api/wallet?page=1&limit=5&attribute=id&order=DESC&description=wallet&value=50000.55&status=FINISHED&type=A&expire_at_start=2010-01-01 11:50:00&expire_at_end=2099-01-01 11:50:00&wallet_id=1&created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00&updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00&deleted_at_start=2010-01-01 11:50:00&deleted_at_end=2099-01-01 11:50:00"
    //         )
    //         .send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });
});
