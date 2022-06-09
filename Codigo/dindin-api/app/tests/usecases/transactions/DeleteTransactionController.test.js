require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

const Transaction = require("../../../models/Transaction");

let walletToCreate;

function url(url) {
    return `/api/wallet/${walletToCreate}${url}`;
}

beforeAll(async () => {
    await connectAndLogin();

    const response = await request.post("/api/wallet").send({
        description: `wallet to delete transaction`,
        initial_value: 2000,
    });
    walletToCreate = response.body.wallet.id;
});

afterAll(async () => {
    await close();
});

describe("DELETE wallet/:id/transaction/:tid test suite", () => {
    it("should delete a goal", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
        };

        const createMockResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        const response = await request
            .delete(url("/transaction/") + createMockResponse.body.id)
            .send();

        expect(response.statusCode).toEqual(204);

        const tryToFindGoal = await Transaction.findByPk(
            createMockResponse.body.id
        );
        expect(tryToFindGoal).toBeNull();
    });

    it("should not find a non-existent transaction when trying to delete it", async () => {
        const nonExistentId = 987654321;
        const response = await request
            .delete(url("/transaction/") + nonExistentId)
            .send();

        expect(response.statusCode).toEqual(404);

        const tryToFindGoal = await Transaction.findByPk(nonExistentId);
        expect(tryToFindGoal).toBeNull();
    });
});
