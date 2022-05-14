require("dotenv").config();

const { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

let walletToList;
const mockCategoryIds = [];
const toDeleteCategory = {
    category: 0,
    type: "IN",
};

beforeAll(async () => {
    await connectAndLogin();

    const response = await request.post("/api/wallet").send({
        description: `wallet to list category test`,
        initial_value: 2000,
    });
    walletToList = response.body.wallet.id;

    for (let i = 0; i < 5; i++) {
        const type = i % 2 === 0 ? "IN" : "OUT";
        const response = await request.post(`/api/wallet/${walletToList}/category`).send({
            wallet_id: 1,
            description: `category to test ${i}`,
            type,
            color: "FF0000",
        });
        if (i === 2) {
            toDeleteCategory.category = response.body.id;
            toDeleteCategory.type = type;
        }
        mockCategoryIds.push(response.body.id);
    }

    await request.delete(`/api/wallet/${walletToList}/category/${toDeleteCategory.category}`);
});

afterAll(async () => {
    await close();
});

describe("GET /category test suite", () => {
    it("should list the categories", async () => {
        const response = await request.get(`/api/wallet/${walletToList}/category/`).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories with limit", async () => {
        const response = await request.get(`/api/wallet/${walletToList}/category/`).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories with asc order id", async () => {
        const response = await request
            .get(`/api/wallet/${walletToList}/category?attribute=id&order=ASC`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(Number(response.body.categories[0].id)).toEqual(
            mockCategoryIds[0]
        );
    });

    it("should list the categories with desc order id", async () => {
        const response = await request
            .get(`/api/wallet/${walletToList}/category?attribute=id&order=DESC`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(Number(response.body.categories[0].id)).toEqual(
            mockCategoryIds[mockCategoryIds.length - 1]
        );
    });

    it("should list the categories with description search", async () => {
        const response = await request
            .get(`/api/wallet/${walletToList}/category?description=1`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });
    it("should list the categories with type search", async () => {
        const response = await request.get(`/api/wallet/${walletToList}/category?type=IN`).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories with wallet_id search", async () => {
        const response = await request.get(`/api/wallet/${walletToList}/category?wallet_id=1`).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories between a created_at search", async () => {
        const response = await request
            .get(
                `/api/wallet/${walletToList}/category?created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00`
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories between a updated_at search", async () => {
        const response = await request
            .get(
                `/api/wallet/${walletToList}/category?updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00`
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the categories with all filters", async () => {
        const response = await request
            .get(
                `/api/wallet/${walletToList}/category?page=1&limit=5&attribute=id&order=DESC&description=cat&type=${toDeleteCategory.type}&wallet_id=1&created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00&updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00`
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("categories");
        expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });
});
