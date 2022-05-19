require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

const Wallet = require("../../../models/Wallet");

beforeAll(async () => {
    await connectAndLogin();
});

afterAll(async () => {
    await close();
});

describe("DELETE /wallet/:id test suite", () => {
    it("should delete a wallet", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };
        //const createdWallet = await Wallet.create(mockWallet);
        const responseCreateWallet = await request
            .post("/api/wallet")
            .send(mockWallet);

        mockWallet.description = "my2wallet";
        delete mockWallet.initial_value;

        const response = await request
            .delete("/api/wallet/" + responseCreateWallet.body.wallet.id)
            .send();

        expect(response.statusCode).toEqual(204);

        const tryToFindWallet = await Wallet.findByPk(
            responseCreateWallet.body.wallet.id
        );
        expect(tryToFindWallet).toBeNull();
    });

    it("should not find a non-existent wallet when trying to delete it", async () => {
        const nonExistentId = 987654321;
        const response = await request
            .delete("/api/wallet/" + nonExistentId)
            .send();

        expect(response.statusCode).toEqual(403);

        const tryToFindWallet = await Wallet.findByPk(nonExistentId);
        expect(tryToFindWallet).toBeNull();
    });

    it("should fail when trying to delete wallet with invalid id", async () => {
        let invalidId = 0;
        let response = await request.delete("/api/wallet/" + invalidId).send();

        expect(response.statusCode).toEqual(403);

        invalidId = -1;
        response = await request.delete("/api/wallet/" + invalidId).send();

        expect(response.statusCode).toEqual(403);

        invalidId = null;
        response = await request.delete("/api/wallet/" + invalidId).send();

        expect(response.statusCode).toEqual(403);

        invalidId = undefined;
        response = await request.delete("/api/wallet/" + invalidId).send();

        expect(response.statusCode).toEqual(403);
    });
});
