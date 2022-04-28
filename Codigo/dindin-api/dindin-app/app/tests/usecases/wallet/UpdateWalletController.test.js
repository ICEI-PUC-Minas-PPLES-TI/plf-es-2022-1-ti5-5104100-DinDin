const supertest = require("supertest"); // "requester"
require("dotenv").config();

const app = require("../../..");
const { connect, close } = require("../../../database");
const Wallet = require("../../../models/Wallet");

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await close();
});

describe("put /wallet test suite", () => {
    it("should update an wallet a description of my1wallet to my2wallet", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };
        const createdWallet = await Wallet.create(mockWallet);

        mockWallet.description = "my2wallet";

        const response = await supertest(app)
            .put("/api/wallet/" + createdWallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(200);

        expect(response.body.description).toEqual(mockWallet.description);
        expect(response.body.initial_value).toEqual(mockWallet.initial_value);
    });

    it("should fail validation to update send empty description", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };
        const createdWallet = await Wallet.create(mockWallet);

        mockWallet.description = "";

        const response = await supertest(app)
            .put("/api/wallet/" + createdWallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation to update send null description", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };
        const createdWallet = await Wallet.create(mockWallet);

        mockWallet.description = null;

        const response = await supertest(app)
            .put("/api/wallet/" + createdWallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });

    it("should not update an wallet initial value", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };
        const createdWallet = await Wallet.create(mockWallet);

        mockWallet.description = "my2wallet";
        mockWallet.initial_value = 3000;

        const response = await supertest(app)
            .put("/api/wallet/" + createdWallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(200);
        expect(response.body.description).toEqual(mockWallet.description);
        expect(response.body.initial_value).not.toEqual(
            mockWallet.initial_value
        );
    });
});
