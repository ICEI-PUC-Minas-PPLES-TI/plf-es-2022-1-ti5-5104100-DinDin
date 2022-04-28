const supertest = require("supertest"); // "requester"
require("dotenv").config();

const app = require("../../..");
const { connect, close } = require("../../../database");
const Wallet = require("../../../models/Wallet");
var defaults = require("superagent-defaults");
var request = defaults(supertest(app)); // or url

beforeAll(async () => {
    await connect();
    const mockmail = `${Math.random()}@email.com`;
    const mockPassword = `${Math.random()}@ultrapassword`;

    await supertest(app).post("/api/user").send({
        name: "User Test",
        email: mockmail,
        password: mockPassword,
    });

    const response = await supertest(app).post("/api/user/auth").send({
        email: mockmail,
        password: mockPassword,
    });
    request.set("Authorization", response.body.token);
    //request(app)
    //request(app).set("Authorization", response.body.token);
    //request(app).post("/api").set("Authorization", response.body.token); // Works.
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
        expect(createdWallet.initial_value).toEqual(2000);
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
        expect(createdWallet.initial_value).toEqual(10000);
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

    it("should fail validation with number into description ", async () => {
        const mockWallet = {
            description: 100,
            initial_value: 500,
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

    it("should fail validation with initial value less than 0", async () => {
        const mockWallet = {
            description: "wallet1",
            initial_value: -50,
        };

        const response = await request.post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });
});
