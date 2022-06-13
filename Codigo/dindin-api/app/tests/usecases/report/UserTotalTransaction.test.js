let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

let walletToCreate;
let inCategory;
let outCategory;

function urlTransaction(url) {
    return `/api/wallet/${walletToCreate}${url}`;
}

function urlReport(params) {
    return `/api/report/usertotal${params}`;
}

beforeAll(async () => {
    await connectAndLogin();

    const response = await request.post("/api/wallet").send({
        description: `wallet to goal delete test`,
        initial_value: 1000,
    });
    walletToCreate = response.body.wallet.id;

    const responseINCategory = await request
        .post(urlTransaction("/category/"))
        .send({
            description: "category IN",
            type: "IN",
            color: "FF0000",
        });
    inCategory = responseINCategory.body.id;
    const responseOUTCategory = await request
        .post(urlTransaction("/category/"))
        .send({
            description: "category OUT",
            type: "OUT",
            color: "FF0000",
        });
    outCategory = responseOUTCategory.body.id;

    let mockTransaction = {
        description: "my transaction",
        value: 2000,
        date: "2021-10-10",
        category_id: inCategory,
    };
    let res1 = await request
        .post(urlTransaction("/transaction"))
        .send(mockTransaction);
    console.log(res1.body, res1.statusCode);

    mockTransaction = {
        description: "my transaction",
        value: -100,
        date: "2021-10-10",
        category_id: outCategory,
    };
    let res2 = await request
        .post(urlTransaction("/transaction"))
        .send(mockTransaction);
    console.log(res2.body, res2.statusCode);
});

afterAll(async () => {
    await close();
});

describe("GET report/usertotal?wallet_id=x  test suite", () => {
    it("should calculate the total money in the user wallet", async () => {
        const response = await request.get(
            urlReport(`?wallet_id=${walletToCreate}`)
        );

        expect(response.statusCode).toEqual(200);
        expect(response.body.total).toEqual(2900);
    });

    it("should calculate the total money in the user wallet with value search", async () => {
        const response = await request.get(
            urlReport(`?wallet_id=${walletToCreate}&value=2000`)
        );

        expect(response.statusCode).toEqual(200);
    });

    it("should calculate the total money in the user wallet with category_id=0", async () => {
        const response = await request.get(
            urlReport(`?wallet_id=${walletToCreate}&category_id=0`)
        );

        expect(response.statusCode).toEqual(200);
    });

    it("should calculate the total money in the user wallet with category_id without permission", async () => {
        const response = await request.get(
            urlReport(`?wallet_id=${walletToCreate}&category_id=1`)
        );

        expect(response.statusCode).toEqual(403);
    });

    it("should calculate the total money in the user wallet with category_id with permission", async () => {
        const response = await request.get(
            urlReport(`?wallet_id=${walletToCreate}&category_id=${inCategory}`)
        );

        expect(response.statusCode).toEqual(200);
    });

    it("should calculate the total money in the user wallet with transaction_recurrencies_id null", async () => {
        const response = await request.get(
            urlReport(
                `?wallet_id=${walletToCreate}&transaction_recurrencies_id="null"`
            )
        );

        expect(response.statusCode).toEqual(200);
    });

    it("should calculate the total money in the user wallet with transaction_recurrencies_id", async () => {
        const response = await request.get(
            urlReport(
                `?wallet_id=${walletToCreate}&transaction_recurrencies_id=1`
            )
        );

        expect(response.statusCode).toEqual(200);
    });

    it("should calculate the total money in the user wallet with date search", async () => {
        const response = await request.get(
            urlReport(
                `?wallet_id=${walletToCreate}&date_start=2020-01-01&date_end=2023-01-01`
            )
        );

        expect(response.statusCode).toEqual(200);
    });

    it("should calculate the total money in the user wallet with created/updated/deleted dates search", async () => {
        const response = await request.get(
            urlReport(
                `?wallet_id=${walletToCreate}&created_at_start=2020-01-01&created_at_end=2023-01-01&updated_at_start=2020-01-01&updated_at_end=2023-01-01&deleted_at_start=2020-01-01&deleted_at_end=2023-01-01`
            )
        );

        expect(response.statusCode).toEqual(200);
    });
});
