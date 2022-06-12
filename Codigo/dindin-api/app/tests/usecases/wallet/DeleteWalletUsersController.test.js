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
        let wallet = await Wallet.create({
            description: `WalletDeleteUser 1`,
            shared: false,
            initial_value: 1000,
            owner_id: login.userId,
        });
        await UserHasWallet.create({
            wallet_id: wallet.id,
            user_id: login.userId,
        });

        let user = null;

        for (let x = 0; x < 5; x++) {
            user = await User.create({
                name: `${wallet.id}JoaoJose${x}`,
                email: `${wallet.id}JoaoJose${x}@email.com`,
                password: `${wallet.id}JoaoJosePassword${x}`,
            });
            await UserHasWallet.create({
                wallet_id: wallet.id,
                user_id: user.id,
            });
        }

        let wallet2 = await Wallet.create({
            description: `WalletDeleteUser 2`,
            shared: false,
            initial_value: 2000,
            owner_id: user.id,
        });
        await UserHasWallet.create({
            wallet_id: wallet2.id,
            user_id: login.userId,
        });
        await UserHasWallet.create({
            wallet_id: wallet2.id,
            user_id: user.id,
        });
    } catch (e) {
        console.log(e);
    }
});

afterAll(async () => {
    await close();
});

describe("DELETE /wallets users test suite", () => {
    it("should delete last user added inside wallet", async () => {
        jest.setTimeout(10000);
        const responseList1 = await request
            .get("/api/wallet?description=WalletDeleteUser")
            .send();
        let walletId = responseList1.body.wallets[0].id;
        const responseUsersList = await request
            .get(`/api/wallet/${walletId}/users`)
            .send();
        const userID =
            responseUsersList.body.users[
                responseUsersList.body.users.length - 1
            ].id;

        const response = await request
            .delete(`/api/wallet/${walletId}/users/${userID}`)
            .send();

        const responseUsersList2 = await request
            .get(`/api/wallet/${walletId}/users`)
            .send();
        let user = null;
        for (let i = 0; i < responseUsersList2.body.users; i++) {
            if (responseUsersList2.body.users[i].id == userID) {
                user = responseUsersList2.body.users[i];
                break;
            }
        }
        expect(user).toBeNull();
        expect(response.statusCode).toEqual(204);
    });

    it("should not delete self logged user", async () => {
        const responseList1 = await request
            .get("/api/wallet?description=WalletDeleteUser")
            .send();
        let walletId = responseList1.body.wallets[0].id;

        const response = await request
            .delete(`/api/wallet/${walletId}/users/${login.userId}`)
            .send();

        expect(response.statusCode).toEqual(405);
    });

    it("should not accept string as user ID", async () => {
        const responseList1 = await request
            .get("/api/wallet?description=WalletDeleteUser")
            .send();
        let walletId = responseList1.body.wallets[0].id;

        const response = await request
            .delete(`/api/wallet/${walletId}/users/banana`)
            .send();

        expect(response.statusCode).toEqual(422);
    });

    it("should not delete another user wallet", async () => {
        const responseList1 = await request
            .get("/api/wallet?description=WalletDeleteUser")
            .send();
        let walletId = responseList1.body.wallets[1].id;

        const response = await request
            .delete(`/api/wallet/${walletId}/users/${login.userId}`)
            .send();

        expect(response.statusCode).toEqual(403);
    });
});
