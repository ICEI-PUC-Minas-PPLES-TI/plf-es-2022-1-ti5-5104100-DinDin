require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

let walletToCreate;

function url(url) {
    return `/api/wallet/${walletToCreate}${url}`;
}

beforeAll(async () => {
    await connectAndLogin();

    const response = await request.post("/api/wallet").send({
        description: `wallet to find transaction`,
        initial_value: 2000,
    });
    walletToCreate = response.body.wallet.id;

    await request.post(url("/category/")).send({
        description: "category IN",
        type: "IN",
        color: "FF0000",
    });
    await request.post(url("/category/")).send({
        description: "category OUT",
        type: "OUT",
        color: "FF0000",
    });
});

afterAll(async () => {
    await close();
});

describe("GET /wallet/:id/transaction/:tid test suite", () => {
    it("should find and return the transaction", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
        };

        const createResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        const response = await request
            .get(url("/transaction/") + createResponse.body.id)
            .send();

        expect(response.statusCode).toEqual(200);

        const transaction = response.body;
        expect(transaction.description).toEqual(mockTransaction.description);
        expect(transaction.value).toEqual(mockTransaction.value);
        expect(transaction.category_id).toEqual(null);
        const date = new Date(transaction.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    });

    it("should not find a transaction", async () => {
        const unexistingGoalId = 987654321;
        const response = await request
            .get(url("/transaction/") + unexistingGoalId)
            .send();

        expect(response.statusCode).toEqual(404);
    });
});
