require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");
const Wallet = require("../../../models/Wallet");
const UserHasWallet = require("../../../models/UserHasWallet");
const User = require("../../../models/User");

var login = null;

beforeAll(async () => {
    login = await connectAndLogin();
    try {
        for (let i = 0; i < 30; i++) {
            let wallet = await Wallet.create({
                description: `WalletUser ${i}`,
                shared: false,
                initial_value: i * 1000,
            });
            await UserHasWallet.create({
                wallet_id: wallet.id,
                user_id: login.userId,
            });

            for (let x = 0; x < 5; x++) {
                let user = await User.create({
                    name: `${i}JoaoJose${x}`,
                    email: `${i}JoaoJose${x}@email.com`,
                    password: `${i}JoaoJosePassword${x}`,
                });
                await UserHasWallet.create({
                    wallet_id: wallet.id,
                    user_id: user.id,
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
});

afterAll(async () => {
    await close();
});

describe("GET /wallet users test suite", () => {
    it("should list the wallets users", async () => {
        const responseList1 = await request.get("/api/wallet/").send();
        let walletId = responseList1.body.wallets[0].id;
        const response = await request
            .get("/api/wallet/" + walletId + "/users")
            .send();

        expect(response.statusCode).toEqual(200); //possible issue
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("users");
        expect(response.body.users.length).toBeGreaterThanOrEqual(1);
    });

    it("should list users from wallet 2", async () => {
        const responseList1 = await request.get("/api/wallet/").send();
        console.log("oii");
        console.log(responseList1.body);
        let walletId = responseList1.body.wallets[1].id;

        const response = await request
            .get("/api/wallet/" + walletId + "/users")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("users");
        expect(response.body.users.length).toBeGreaterThanOrEqual(1);
    });

    it("should list users from wallet 3", async () => {
        const responseList1 = await request.get("/api/wallet/").send();
        let walletId = responseList1.body.wallets[2].id;

        const response = await request
            .get("/api/wallet/" + walletId + "/users")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("users");
        expect(response.body.users.length).toBeGreaterThanOrEqual(1);
    });
});
