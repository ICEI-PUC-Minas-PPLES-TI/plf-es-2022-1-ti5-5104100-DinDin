let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");
const Transaction = require("../../../models/Transaction");

let walletToCreate;
let INCategory;
let OUTCategory;

function url(url){
    return `/api/wallet/${walletToCreate}${url}`;
}

beforeAll(async () => {
    await connectAndLogin();

    const response = await request.post("/api/wallet").send({
        description: `wallet to goal delete test`,
        initial_value: 2000,
    });
    walletToCreate = response.body.wallet.id;

    const responseINCategory = await request
            .post(url("/category/"))
            .send({
                description: "category IN",
                type: "IN",
                color: "FF0000",
            });
    INCategory = responseINCategory.body.id;
    const responseOUTCategory = await request
            .post(url("/category/"))
            .send({
                description: "category OUT",
                type: "OUT",
                color: "FF0000",
            });
    OUTCategory = responseOUTCategory.body.id;
    
});

afterAll(async () => {
    await close();
});

describe("POST /transaction test suite", ()=>{
    it("should create an income transaction without category", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10"
        };

        const response = await request.post(url("/transaction")).send(mockTransaction);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("id");
        const createdTransaction = await Transaction.findByPk(response.body.id);
        expect(createdTransaction.description).toEqual(mockTransaction.description);
        expect(createdTransaction.value).toEqual(mockTransaction.value);
        expect(createdTransaction.category_id).toEqual(null);
        const date = new Date(createdTransaction.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    })

    it("should create an outcome transaction without category", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: -2000,
            date: "2021-10-10"
        };

        const response = await request.post(url("/transaction")).send(mockTransaction);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("id");
        const createdTransaction = await Transaction.findByPk(response.body.id);
        expect(createdTransaction.description).toEqual(mockTransaction.description);
        expect(createdTransaction.value).toEqual(mockTransaction.value);
        expect(createdTransaction.category_id).toEqual(null);
        const date = new Date(createdTransaction.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    })

    it("should create an income transaction with category", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
            category_id: INCategory
        };

        const response = await request.post(url("/transaction")).send(mockTransaction);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("id");
        const createdTransaction = await Transaction.findByPk(response.body.id);
        expect(createdTransaction.description).toEqual(mockTransaction.description);
        expect(createdTransaction.value).toEqual(mockTransaction.value);
        expect(Number(createdTransaction.category_id)).toEqual(INCategory);
        const date = new Date(createdTransaction.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    })

    it("should create an outcome transaction with category", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: -2000,
            date: "2021-10-10",
            category_id: OUTCategory
        };

        const response = await request.post(url("/transaction")).send(mockTransaction);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("id");
        const createdTransaction = await Transaction.findByPk(response.body.id);
        expect(createdTransaction.description).toEqual(mockTransaction.description);
        expect(createdTransaction.value).toEqual(mockTransaction.value);
        expect(Number(createdTransaction.category_id)).toEqual(OUTCategory);
        const date = new Date(createdTransaction.date);
        expect(date.toISOString().split("T")[0]).toEqual(mockTransaction.date);
    })

    it("should not create an outcome transaction with income category", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: -2000,
            date: "2021-10-10",
            category_id: INCategory
        };

        const response = await request.post(url("/transaction")).send(mockTransaction);
        expect(response.statusCode).toEqual(422);
    })

    it("should not create an income transaction with outcome category", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 2000,
            date: "2021-10-10",
            category_id: OUTCategory
        };

        const response = await request.post(url("/transaction")).send(mockTransaction);
        expect(response.statusCode).toEqual(422);
    })

    it("should not create an transaction without value", async () => {
        const mockTransaction = {
            description: "my transaction",
            date: "2021-10-10",
            category_id: OUTCategory
        };

        const response = await request.post(url("/transaction")).send(mockTransaction);
        expect(response.statusCode).toEqual(422);
    })

    it("should not create an transaction without description", async () => {
        const mockTransaction = {
            value: 2000,
            date: "2021-10-10",
            category_id: OUTCategory
        };

        const response = await request.post(url("/transaction")).send(mockTransaction);
        expect(response.statusCode).toEqual(422);
    })

    it("should not create an transaction with value 0", async () => {
        const mockTransaction = {
            description: "my transaction",
            value: 0,
            date: "2021-10-10",
            category_id: OUTCategory
        };

        const response = await request.post(url("/transaction")).send(mockTransaction);
        expect(response.statusCode).toEqual(422);
    })
})