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

describe("POST /wallet test suite", () => {
    it("should create an wallet with description my1wallet", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000
        };

        const response = await supertest(app).post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("id");
        const createdWallet = await WalletfindByPk(parseInt(response.body.id));
        expect(createdWallet.description).toEqual("my1wallet");
        expect(createdWallet.initial_value).toEqual(2000);
    });


    it("should create an wallet with 10000 initial value", async () => {
      const mockWallet = {
          description: "my2wallet",
          initial_value: 10000
      };

      const response = await supertest(app).post("/api/wallet").send(mockWallet);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty("id");
      const createdWallet = await WalletfindByPk(parseInt(response.body.id));
      expect(createdWallet.description).toEqual("my2wallet");
      expect(createdWallet.initial_value).toEqual(10000);
  });

    it("should fail validation without description", async () => {
        const mockWallet = {
          initial_value: 2000
        };

        const response = await supertest(app).post("/api/wallet").send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation without initial value", async () => {
      const mockWallet = {
        description: "wallet3"
      };

      const response = await supertest(app).post("/api/wallet").send(mockWallet);

      expect(response.statusCode).toEqual(422);
  });

  it("should fail validation without initial value and description", async () => {
    const mockWallet = {
      description: null,
      initial_value: null
    };

    const response = await supertest(app).post("/api/wallet").send(mockWallet);

    expect(response.statusCode).toEqual(422);
  });


  it("should fail validation with number into description ", async () => {
    const mockWallet = {
      description: 100,
      initial_value: 500
    };

    const response = await supertest(app).post("/api/wallet").send(mockWallet);

    expect(response.statusCode).toEqual(422);
});
    // it("should fail validation without value", async () => {
    //     const mockWallet = {
    //         description: "my goal",
    //         type: "A",
    //         expire_at: "2030-10-10",
    //         wallet_id: 1,
    //     };

    //     const response = await supertest(app).post("/api/goal").send(mockWallet);

    //     expect(response.statusCode).toEqual(422);
    // });

    // it("should fail validation without type", async () => {
    //     const mockWallet = {
    //         description: "my goal",
    //         value: 2000,
    //         expire_at: "2030-10-10",
    //         wallet_id: 1,
    //     };

    //     const response = await supertest(app).post("/api/goal").send(mockWallet);

    //     expect(response.statusCode).toEqual(422);
    // });

    // it("should fail validation without expire_at", async () => {
    //     const mockWallet = {
    //         description: "my goal",
    //         value: 2000,
    //         type: "A",
    //         wallet_id: 1,
    //     };

    //     const response = await supertest(app).post("/api/goal").send(mockWallet);

    //     expect(response.statusCode).toEqual(422);
    // });

    // it("should fail validation without wallet_id", async () => {
    //     const mockWallet = {
    //         description: "my goal",
    //         value: 2000,
    //         type: "A",
    //         expire_at: "2030-10-10",
    //     };

    //     const response = await supertest(app).post("/api/goal").send(mockWallet);

    //     expect(response.statusCode).toEqual(422);
    // });

    // it("should fail validation with a big description ", async () => {
    //     const mockWallet = {
    //         description: "1234567890123456789012345678901",
    //         value: 2000,
    //         type: "A",
    //         expire_at: "2030-10-10",
    //         wallet_id: 1,
    //     };

    //     const response = await supertest(app).post("/api/goal").send(mockWallet);

    //     expect(response.statusCode).toEqual(422);
    // });

    // it("should fail validation with a invalid value", async () => {
    //     const mockWallet = {
    //         description: "my goal",
    //         value: "notANumber",
    //         type: "A",
    //         expire_at: "2030-10-10",
    //         wallet_id: 1,
    //     };

    //     const response = await supertest(app).post("/api/goal").send(mockWallet);

    //     expect(response.statusCode).toEqual(422);
    // });

    // it("should fail validation with a invalid type", async () => {
    //     const mockWallet = {
    //         description: "my goal",
    //         value: 2000,
    //         type: "X",
    //         expire_at: "2030-10-10",
    //         wallet_id: 1,
    //     };

    //     const response = await supertest(app).post("/api/goal").send(mockWallet);

    //     expect(response.statusCode).toEqual(422);
    // });

    // it("should fail validation with a invalid expire_at", async () => {
    //     const mockWallet = {
    //         description: "my goal",
    //         value: 2000,
    //         type: "A",
    //         expire_at: "notADate",
    //         wallet_id: 1,
    //     };

    //     const response = await supertest(app).post("/api/goal").send(mockWallet);

    //     expect(response.statusCode).toEqual(422);
    // });

    // it("should fail validation with a invalid wallet_id", async () => {
    //     const mockWallet = {
    //         description: "my goal",
    //         value: 2000,
    //         type: "A",
    //         expire_at: "2030-10-10",
    //         wallet_id: "notAId",
    //     };

    //     const response = await supertest(app).post("/api/goal").send(mockWallet);

    //     expect(response.statusCode).toEqual(422);
    // });
});
