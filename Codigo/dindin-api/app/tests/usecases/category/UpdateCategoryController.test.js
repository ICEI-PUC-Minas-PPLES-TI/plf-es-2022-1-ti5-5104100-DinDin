require("dotenv").config();
let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

const Category = require("../../../models/Category");

let walletToCreateId;
let loggedUserId;
let categoryId;

beforeAll(async () => {
    const { userId } = await connectAndLogin();
    loggedUserId = userId;
    const response = await request.post("/api/wallet").send({
        description: `wallet to create category test`,
        initial_value: 2000,
    });
    walletToCreateId = response.body.wallet.id;
});

afterAll(async () => {
    await close();
});

describe("PUT /category test suite", () => {
    it("should update a category", async () => {
        const mockCategory = {
            description: "teste",
            type: "IN",
            color: "qwe23",
            user_id: loggedUserId,
            wallet_id: walletToCreateId,
        };
        const createdCategory = await Category.create(mockCategory);
        categoryId = createdCategory.id;
        mockCategory.description = "Category Updated";
        mockCategory.color = "1233er";
        const response = await request
            .put(`/api/wallet/${walletToCreateId}/category/${categoryId}`)
            .send(mockCategory);
        expect(response.statusCode).toEqual(200);
        expect(response.body.description).toEqual(mockCategory.description);
        expect(response.body.color).toEqual(mockCategory.color);
    });
    it("should fail validation with big description", async () => {
        const response = await request
            .put(`/api/wallet/${walletToCreateId}/category/${categoryId}`)
            .send({
                description: "MaisDe30CaracteresParaRetornar422",
                type: "OUT",
                color: "FF0000",
            });
        expect(response.statusCode).toEqual(422);
    });
    it("should not update a new category with invalid type", async () => {
        const response = await request
            .put(`/api/wallet/${walletToCreateId}/category/${categoryId}`)
            .send({
                description: "test",
                type: "invalid",
                color: "FF0000",
            });
        expect(response.statusCode).toEqual(422);
    });
    it("should not update a new category with invalid color (small)", async () => {
        const response = await request
            .put(`/api/wallet/${walletToCreateId}/category/${categoryId}`)
            .send({
                description: "test",
                type: "OUT",
                color: "so3",
            });
        expect(response.statusCode).toEqual(422);
    });
    it("should not update a new category with invalid color (big)", async () => {
        const response = await request
            .put(`/api/wallet/${walletToCreateId}/category/${categoryId}`)
            .send({
                description: "test",
                type: "OUT",
                color: "maisde6",
            });
        expect(response.statusCode).toEqual(422);
    });
    it("should not category wallet_id and user_id", async () => {
        const category = await Category.findByPk(categoryId);
        const oldWalletId = category.wallet_id;
        const oldUserId = category.wallet_id;
        const response = await request
            .put(`/api/wallet/${walletToCreateId}/category/${categoryId}`)
            .send({
                user_id: "24898489",
                wallet_id: "24898489",
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("user_id");
        expect(response.body).toHaveProperty("wallet_id");
        const getResponse = await request.get(
            `/api/wallet/${walletToCreateId}/category/${categoryId}`
        );
        expect(getResponse.body.wallet_id).toEqual(oldUserId);
        expect(getResponse.body.wallet_id).toEqual(oldWalletId);
    });
});
