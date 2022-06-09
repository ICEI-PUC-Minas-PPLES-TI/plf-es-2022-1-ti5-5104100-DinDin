let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");
// const Transaction = require("../../../models/Transaction");

let walletToCreate;
let INCategory;
// let OUTCategory;

function url(url) {
    return `/api/wallet/${walletToCreate}${url}`;
}

beforeAll(async () => {
    await connectAndLogin();

    const response = await request.post("/api/wallet").send({
        description: `wallet to goal delete test`,
        initial_value: 2000,
    });
    walletToCreate = response.body.wallet.id;

    const responseINCategory = await request.post(url("/category/")).send({
        description: "category IN",
        type: "IN",
        color: "FF0000",
    });
    INCategory = responseINCategory.body.id;
    const responseOUTCategory = await request.post(url("/category/")).send({
        description: "category OUT",
        type: "OUT",
        color: "FF0000",
    });
    OUTCategory = responseOUTCategory.body.id;
});

afterAll(async () => {
    await close();
});

describe("PUT wallet/:id/transaction/:tid  test suite", () => {
    it("should update the trasaction", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
        };

        const createResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        mockTransaction.description = "transaction updated";
        mockTransaction.value = 3000;
        mockTransaction.date = "2020-10-10";
        mockTransaction.category_id = INCategory;

        const response = await request
            .put(url("/transaction/") + createResponse.body.id)
            .send(mockTransaction);

        expect(response.statusCode).toEqual(200);
        expect(response.body.description).toEqual(mockTransaction.description);
        expect(response.body.value).toEqual(mockTransaction.value);
        expect(response.body.category_id).toEqual(mockTransaction.category_id);
        const date = new Date(response.body.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    });

    it("should update only value", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
            category_id: INCategory,
        };

        const createResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        mockTransaction.value = 3000;

        const response = await request
            .put(url("/transaction/") + createResponse.body.id)
            .send(mockTransaction);

        expect(response.statusCode).toEqual(200);
        expect(response.body.description).toEqual(mockTransaction.description);
        expect(response.body.value).toEqual(mockTransaction.value);
        expect(response.body.category_id).toEqual(mockTransaction.category_id);
        const date = new Date(response.body.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    });

    it("should update only date", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
            category_id: INCategory,
        };

        const createResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        mockTransaction.date = "2020-10-10";

        const response = await request
            .put(url("/transaction/") + createResponse.body.id)
            .send(mockTransaction);

        expect(response.statusCode).toEqual(200);
        expect(response.body.description).toEqual(mockTransaction.description);
        expect(response.body.value).toEqual(mockTransaction.value);
        expect(response.body.category_id).toEqual(mockTransaction.category_id);
        const date = new Date(response.body.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    });

    it("should update only category", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
        };

        const createResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        mockTransaction.category_id = INCategory;

        const response = await request
            .put(url("/transaction/") + createResponse.body.id)
            .send(mockTransaction);

        expect(response.statusCode).toEqual(200);
        expect(response.body.description).toEqual(mockTransaction.description);
        expect(response.body.value).toEqual(mockTransaction.value);
        expect(response.body.category_id).toEqual(mockTransaction.category_id);
        const date = new Date(response.body.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    });

    it("should update only description", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
            category_id: INCategory,
        };

        const createResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        mockTransaction.description = "transaction updated";

        const response = await request
            .put(url("/transaction/") + createResponse.body.id)
            .send(mockTransaction);

        expect(response.statusCode).toEqual(200);
        expect(response.body.description).toEqual(mockTransaction.description);
        expect(response.body.value).toEqual(mockTransaction.value);
        expect(response.body.category_id).toEqual(mockTransaction.category_id);
        const date = new Date(response.body.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    });

    it("should not update a transaction to value 0", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
        };

        const createResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        mockTransaction.value = 0;

        const response = await request
            .put(url("/transaction/") + createResponse.body.id)
            .send(mockTransaction);

        expect(response.statusCode).toEqual(422);
    });

    it("should not update a transaction from income to outcome without updating category", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
            category_id: INCategory,
        };

        const createResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        mockTransaction.value = -2000;

        const response = await request
            .put(url("/transaction/") + createResponse.body.id)
            .send(mockTransaction);

        expect(response.statusCode).toEqual(422);
    });

    it("should not update a transaction with long description", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
            category_id: INCategory,
        };

        const createResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        mockTransaction.description =
            "this is a long, very long, absolety long description";

        const response = await request
            .put(url("/transaction/") + createResponse.body.id)
            .send(mockTransaction);

        expect(response.statusCode).toEqual(422);
    });
});
