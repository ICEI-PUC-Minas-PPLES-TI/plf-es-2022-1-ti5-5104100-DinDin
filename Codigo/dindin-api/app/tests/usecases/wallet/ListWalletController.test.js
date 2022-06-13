require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");
const Wallet = require("../../../models/Wallet");
const UserHasWallet = require("../../../models/UserHasWallet");
var login = null;

beforeAll(async () => {
    jest.setTimeout(30000);
    login = await connectAndLogin();
    for (let i = 0; i < 30; i++) {
        let wallet = await Wallet.create({
            description: `wallet ${i}`,
            shared: false,
            initial_value: i * 1000,
            owner_id: login.userId,
        });
        await UserHasWallet.create({
            wallet_id: wallet.id,
            user_id: login.userId,
        });
    }
});

afterAll(async () => {
    await close();
});

describe("GET /wallet test suite", () => {
    it("should list the wallets", async () => {
        const response = await request.get("/api/wallet/").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the wallets with limit", async () => {
        const response = await request.get("/api/wallet?limit=1").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the wallets with asc order id", async () => {
        const response = await request
            .get("/api/wallet?attribute=id&order=ASC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets[0].id).not.toEqual("12");
    });

    it("should list the wallets with desc order id", async () => {
        const response = await request
            .get("/api/wallet?attribute=id&order=DESC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets[0].id).not.toEqual(1);
    });

    it("should list the wallets with  wallet 1 search", async () => {
        const response = await request
            .get("/api/wallet?description=wallet 1")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the wallets with  wallet 2 search", async () => {
        const response = await request
            .get("/api/wallet?description=wallet 2")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    });
    it("should list the wallets with shared false search", async () => {
        const response = await request.get("/api/wallet?shared=false").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the wallets with shared true search", async () => {
        const response = await request.get("/api/wallet?shared=true").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets.length).toBeGreaterThanOrEqual(0);
    });

    it("should list the wallets with all filters", async () => {
        const response = await request
            .get(
                "/api/wallet?page=1&limit=5&attribute=id&order=DESC&description=wallet&shared=false"
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("wallets");
        expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    });

    // it("should list the wallets between a created_at search", async () => {
    //     const response = await request
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
    //     const response = await request
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
    //     const response = await request
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
});
