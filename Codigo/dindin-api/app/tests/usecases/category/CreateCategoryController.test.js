require("dotenv").config();
const { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");
const Category = require("../../../models/Category");

let loggedUserId;
let walletToCreate;

beforeAll(async () => {
    const { userId } = await connectAndLogin();
    loggedUserId = userId;

    const response = await request.post("/api/wallet").send({
        description: `wallet to create category test`,
        initial_value: 2000,
    });
    walletToCreate = response.body.wallet.id;

});

afterAll(async () => {
    await close();
});

describe("POST /wallet/:id/cattegory test suite", () => {
    it("should create a new category IN", async () => {
        const response = await request.post(`/api/wallet/${walletToCreate}/category/`).send({
            wallet_id: 1,
            description: "teste IN",
            type: "IN",
            color: "FF0000",
        });

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("id");
        const createdCategory = await Category.findByPk(
            parseInt(response.body.id)
        );
        expect(createdCategory.dataValues.user_id).toEqual(loggedUserId);
        expect(createdCategory.dataValues.wallet_id).toEqual(`${walletToCreate}`);
        expect(createdCategory.dataValues.description).toEqual("teste IN");
        expect(createdCategory.dataValues.type).toEqual("IN");
        expect(createdCategory.dataValues.color).toEqual("FF0000");
    });

    it("should create a new category OUT", async () => {
        const response = await request.post(`/api/wallet/${walletToCreate}/category/`).send({
            wallet_id: 2,
            description: "teste OUT",
            type: "OUT",
            color: "000000",
        });

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("id");
        const createdCategory = await Category.findByPk(
            parseInt(response.body.id)
        );
        expect(createdCategory.dataValues.user_id).toEqual(loggedUserId);
        expect(createdCategory.dataValues.wallet_id).toEqual(`${walletToCreate}`);
        expect(createdCategory.dataValues.description).toEqual("teste OUT");
        expect(createdCategory.dataValues.type).toEqual("OUT");
        expect(createdCategory.dataValues.color).toEqual("000000");
    });

    it("should fail validation missing wallet_id", async () => {
        const response = await request.post(`/api/wallet/${walletToCreate}/category/`).send({
            description: "teste",
            type: "IN",
            color: "FF0000",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation missing description", async () => {
        const response = await request.post(`/api/wallet/${walletToCreate}/category/`).send({
            wallet_id: 1,
            type: "OUT",
            color: "FF0000",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation missing type", async () => {
        const response = await request.post(`/api/wallet/${walletToCreate}/category/`).send({
            wallet_id: 1,
            description: "teste",
            color: "FF0000",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation with big description", async () => {
        const response = await request.post(`/api/wallet/${walletToCreate}/category/`).send({
            wallet_id: 1,
            description: "MaisDe30CaracteresParaRetornar422",
            type: "OUT",
            color: "FF0000",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should not create a new category with invalid type", async () => {
        const response = await request.post(`/api/wallet/${walletToCreate}/category/`).send({
            user_id: 1,
            wallet_id: 1,
            description: "test",
            type: "invalid",
            color: "FF0000",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should not create a new category with invalid color (small)", async () => {
        const response = await request.post(`/api/wallet/${walletToCreate}/category/`).send({
            user_id: 1,
            wallet_id: 1,
            description: "test",
            type: "OUT",
            color: "so3",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should not create a new category with invalid color (big)", async () => {
        const response = await request.post(`/api/wallet/${walletToCreate}/category/`).send({
            user_id: 1,
            wallet_id: 1,
            description: "test",
            type: "OUT",
            color: "maisde6",
        });
        expect(response.statusCode).toEqual(422);
    });
});
