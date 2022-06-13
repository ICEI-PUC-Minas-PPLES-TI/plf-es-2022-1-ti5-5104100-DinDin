require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

const mockTransactionIds = [];
let walletIdToSearch;
let INCategory;
let OUTCategory;
const toDeleteTransaction = {
    transaction: 0,
    wallet: 0,
};

function url(url) {
    return `/api/wallet/${walletIdToSearch}${url}`;
}

beforeAll(async () => {
    await connectAndLogin();

    const response = await request.post("/api/wallet").send({
        description: `mockup wallet test`,
        initial_value: 0,
    });
    walletIdToSearch = response.body.wallet.id;
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

    for (let i = 0; i < 5; i++) {
        const outcome = i % 2 == 0;

        const mockTransaction = {
            description: "my transaction " + i,
            value: 2000 * (outcome ? -1 : 1),
            date: "2021-10-10",
            category_id: outcome ? OUTCategory : INCategory,
        };

        const transactionResponse = await request
            .post(url("/transaction"))
            .send(mockTransaction);

        if (i === 2) {
            (toDeleteTransaction.wallet = response.body.wallet.id),
                (toDeleteTransaction.transaction = transactionResponse.body.id);
        }
        mockTransactionIds.push(transactionResponse.body.id);
    }
    // dando update para filtro com updated_at
    await request.put(url("/transaction/") + mockTransactionIds[1]).send({
        date: "2022-10-10",
    });
    // deletando um para filtro deleted_at
    await request.delete(
        url("/transaction/") + toDeleteTransaction.transaction
    );
});

afterAll(async () => {
    await close();
});

describe("GET /goal test suite", () => {
    it("should list transactions", async () => {
        const response = await request.get(url("/transaction")).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });

    it("should list transactions with limit", async () => {
        const response = await request.get(url("/transaction?limit=1")).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBe(1);

        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });

    it("should list transactions with pagination", async () => {
        const response = await request
            .get(url("/transaction?page=2&limit=2"))
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });

    it("should list transactions sorting by attribute 'description', in ASC order", async () => {
        const response = await request
            .get(url("/transaction?attribute=description&order=ASC"))
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);
        expect(response.body.transactions[0].id).toBe(mockTransactionIds[0]);
        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });

    it("should list transactions sorting by attribute 'description', in DESC order", async () => {
        const response = await request
            .get(url("/transaction?attribute=description&order=DESC"))
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        expect(response.body.transactions[0].id).toBe(
            mockTransactionIds[mockTransactionIds.length - 1]
        );
        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });

    it("should list transactions filtering by category", async () => {
        const response = await request
            .get(url("/transaction?category_id=" + INCategory))
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        response.body.transactions.forEach((transaction) => {
            expect(Number(transaction.category_id)).toBe(INCategory);
        });
    });

    it("should list transactions filtering by description", async () => {
        const response = await request
            .get(url("/transaction?description=0"))
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        expect(response.body.transactions[0].id).toBe(mockTransactionIds[0]);
    });

    it("should list transactions filtering by value", async () => {
        const response = await request
            .get(url("/transaction?value=-2000"))
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });

    it("should list transactions filtering by date", async () => {
        const response = await request
            .get(url("/transaction?date_start=2010-01-01&date_end=2099-01-01"))
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });

    it("should list transactions filtering by created_at", async () => {
        const response = await request
            .get(
                url(
                    "/transaction?created_at_start=2010-01-01&created_at_end=2099-01-01"
                )
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });

    it("should list transactions filtering by updated_at", async () => {
        const response = await request
            .get(
                url(
                    "/transaction?updated_at_start=2010-01-01&updated_at_end=2099-01-01"
                )
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });

    it("should list transactions filtering by deleted_at_start", async () => {
        const response = await request
            .get(
                url(
                    "/transaction?deleted_at_start_start=2010-01-01&deleted_at_start_end=2099-01-01"
                )
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("transactions");
        expect(response.body.transactions.length).toBeGreaterThanOrEqual(1);

        response.body.transactions.forEach((transaction) => {
            expect(mockTransactionIds).toContain(transaction.id);
        });
    });
});
