require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

const Wallet = require("../../../models/Wallet");

beforeAll(async () => {
    await connectAndLogin();
});

afterAll(async () => {
    await close();
});

describe("POST /wallet test suite", () => {
    it("should create an wallet with description my1wallet", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };

        const response = await request
            .post("/api/wallet")
            // Works.
            .send(mockWallet);

        expect(response.statusCode).toEqual(201);
        expect(response.body.wallet).toHaveProperty("id");
        const createdWallet = await Wallet.findByPk(
            parseInt(response.body.wallet.id)
        );
        expect(createdWallet.description).toEqual("my1wallet");
    });

    it("should create an wallet with 10000 initial value", async () => {
        const mockWallet = {
            description: "my2wallet",
            initial_value: 10000,
        };

        const response = await request.post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(201);
        expect(response.body.wallet).toHaveProperty("id");
        const createdWallet = await Wallet.findByPk(
            parseInt(response.body.wallet.id)
        );
        expect(createdWallet.description).toEqual("my2wallet");
    });

    it("should create an wallet with description mywallet5", async () => {
        const mockWallet = {
            description: "mywallet5",
            initial_value: 20000,
        };

        const response = await request.post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(201);
        expect(response.body.wallet).toHaveProperty("id");
        const createdWallet = await Wallet.findByPk(
            parseInt(response.body.wallet.id)
        );
        expect(createdWallet.description).toEqual("mywallet5");
    });

    it("should create an wallet with description mywallet6 and 2500.5 initial value", async () => {
        const mockWallet = {
            description: "mywallet6",
            initial_value: 2500.5,
        };

        const response = await request.post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(201);
        expect(response.body.wallet).toHaveProperty("id");
        const createdWallet = await Wallet.findByPk(
            parseInt(response.body.wallet.id)
        );
        expect(createdWallet.description).toEqual("mywallet6");
    });

    it("should fail validation without description", async () => {
        const mockWallet = {
            initial_value: 2000,
        };

        const response = await request.post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation without initial value", async () => {
        const mockWallet = {
            description: "wallet3",
        };

        const response = await request.post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation without initial value and description", async () => {
        const mockWallet = {
            description: null,
            initial_value: null,
        };

        const response = await request.post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation with string into initial value ", async () => {
        const mockWallet = {
            description: "wallet1",
            initial_value: "wallet1",
        };

        const response = await request.post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });
});
