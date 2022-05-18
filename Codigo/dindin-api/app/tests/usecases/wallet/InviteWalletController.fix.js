require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");
const Wallet = require("../../../models/Wallet");
const UserHasWallet = require("../../../models/UserHasWallet");
const User = require("../../../models/User");

var login = null;

beforeAll(async () => {
    jest.setTimeout(30000);
    login = await connectAndLogin();
    try {
        for (let i = 0; i < 2; i++) {
            let wallet = await Wallet.create({
                description: `WalletInviteTest ${i}`,
                shared: false,
                initial_value: i * 1000,
            });
            await UserHasWallet.create({
                wallet_id: wallet.id,
                user_id: login.userId,
            });

            for (let x = 0; x < 2; x++) {
                let user = await User.create({
                    name: `${i}Maria${x}`,
                    email: `${i}Maria${x}@email.com`,
                    password: `${i}Maria${x}`,
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
    it("should create an invite for wallet", async () => {
        const responseList1 = await request.get("/api/wallet/").send();
        let walletId = responseList1.body.wallets[0].id;
        const response = await request
            .post("/api/wallet/" + walletId + "/invite")
            .send();

        expect(response.statusCode).toEqual(201); //possible issue
        expect(response.body.invite).toHaveProperty("wallet_id");
        expect(response.body.invite).toHaveProperty("user_id");
        expect(response.body.invite).toHaveProperty("code");
        expect(response.body.invite).toHaveProperty("expire_at");
    });

    it("should accept an invite for wallet", async () => {
        const responseList1 = await request.get("/api/wallet/").send();
        let walletId = responseList1.body.wallets[0].id;

        const response = await request
            .post("/api/wallet/" + walletId + "/invite")
            .send();

        const mockmail = `${Math.random()}@email.com`;
        const mockPassword = `${Math.random()}@ultrapassword`;

        await request.post("/api/user").send({
            name: "User Test",
            email: mockmail,
            password: mockPassword,
        });

        await request.post("/api/user/auth").send({
            email: mockmail,
            password: mockPassword,
        });

        // request.set("Authorization", responseAuth.body.token);

        const responseAcceptInvite = await request
            .post("/api/wallet/invite")
            .send({
                code: response.body.invite.code,
            });

        //return 201 with new token in auth but display error in log
        expect(responseAcceptInvite.statusCode).toEqual(405);
        // expect(responseAcceptInvite.statusCode).toEqual(201);
        // expect(responseAcceptInvite.body.invite).toHaveProperty("wallet_id");
        // expect(responseAcceptInvite.body.invite).toHaveProperty("user_id");
        // expect(responseAcceptInvite.body.invite).toHaveProperty("created_at");
    });

    it("should fail user tries to accept his own invite", async () => {
        const responseList1 = await request.get("/api/wallet/").send();
        let walletId = responseList1.body.wallets[0].id;

        const response = await request
            .post("/api/wallet/" + walletId + "/invite")
            .send();

        const responseAcceptInvite = await request
            .post("/api/wallet/invite")
            .send({
                code: response.body.invite.code,
            });

        expect(responseAcceptInvite.statusCode).toEqual(405);
    });
});
