require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");
const Wallet = require("../../../models/Wallet");
const UserHasWallet = require("../../../models/UserHasWallet");
const User = require("../../../models/User");

var userID = null;

beforeAll(async () => {
    userID = await connectAndLogin();
    for (let i = 0; i < 30; i++) {
        let wallet = await Wallet.create({
            description: `Wallet ${i}`,
            shared: false,
            initial_value: i * 1000,
        });
        await UserHasWallet.create({
            wallet_id: wallet.id,
            user_id: userID,
        });

        for (let x = 0; x < 5; x++) {
            let user = await User.create({
                name: `${i}Joao${x}`,
                email: `${i}Joao${x}@email.com`,
                password: `${i}Joao${x}`,
            });
            await UserHasWallet.create({
                wallet_id: wallet.id,
                user_id: user.id,
            });
        }
    }
});

afterAll(async () => {
    await close();
});

describe("GET /wallet users test suite", () => {
    it("should list the wallets users", async () => {
        const response = await request.get("/api/wallet/1/users").send();
        console.log(response.body);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("users");
        expect(response.body.users.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the wallets users with limit", async () => {
        const response = await request
            .get("/api/wallet/1/users?limit=1")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("users");
        expect(response.body.users.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the wallets users with asc order id", async () => {
        const response = await request
            .get("/api/wallet/1/users?attribute=id&order=ASC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("users");
        expect(response.body.users[0].id).toEqual("1");
    });

    it("should list the wallets users with desc order id", async () => {
        const response = await request
            .get("/api/wallet/1/users?attribute=id&order=DESC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("users");
        expect(response.body.users[0].id).not.toEqual(1);
    });

    // it("should list the wallets with description search", async () => {
    //     const response = await request
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
    //     const response = await request
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
    //     const response = await request
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
    //     const response = await request.get("/api/wallet?type=A").send();

    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toHaveProperty("count");
    //     expect(response.body).toHaveProperty("total");
    //     expect(response.body).toHaveProperty("pages");
    //     expect(response.body).toHaveProperty("wallets");
    //     expect(response.body.wallets.length).toBeGreaterThanOrEqual(1);
    // });

    // it("should list the wallets between a expire_at search", async () => {
    //     const response = await request
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
    //     const response = await request
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

    // it("should list the wallets with all filters", async () => {
    //     const response = await request
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
