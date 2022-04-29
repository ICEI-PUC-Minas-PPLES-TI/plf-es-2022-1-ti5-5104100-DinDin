const supertest = require("supertest"); // "requester"
require("dotenv").config();

const app = require("../../..");
const { connect, close } = require("../../../database");
const Goal = require("../../../models/Goal");

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await close();
});

describe("POST /goal test suite", () => {
    it("should create an A type goal", async () => {
        const mockGoal = {
            description: "my goal",
            value: 2000,
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("id");
        const createdGoal = await Goal.findByPk(parseInt(response.body.id));
        expect(createdGoal.status).toEqual("PENDING");
        expect(createdGoal.type).toEqual("A");
    });

    it("should create an B type goal", async () => {
        // later validate if a B goal is immediatly accomplished when you already have the achivment amount ( or block the creation of it )
        const mockGoal = {
            description: "my goal",
            value: 2000,
            type: "B",
            expire_at: "2030-10-10",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("id");
        const createdGoal = await Goal.findByPk(response.body.id);
        expect(createdGoal.status).toEqual("PENDING");
        expect(createdGoal.type).toEqual("B");
    });

    it("should not create a goal that has an unexisting wallet", async () => {
        const mockGoal = {
            description: "my goal",
            value: 2000,
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: 125999002, //unexisting wallet
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should not create a goal that has a past limit date", async () => {
        const mockGoal = {
            description: "my goal",
            value: 2000,
            type: "A",
            expire_at: "2020-10-10",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation without description", async () => {
        const mockGoal = {
            value: 2000,
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation without value", async () => {
        const mockGoal = {
            description: "my goal",
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation without type", async () => {
        const mockGoal = {
            description: "my goal",
            value: 2000,
            expire_at: "2030-10-10",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation without expire_at", async () => {
        const mockGoal = {
            description: "my goal",
            value: 2000,
            type: "A",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation without wallet_id", async () => {
        const mockGoal = {
            description: "my goal",
            value: 2000,
            type: "A",
            expire_at: "2030-10-10",
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation with a big description ", async () => {
        const mockGoal = {
            description: "1234567890123456789012345678901",
            value: 2000,
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation with a invalid value", async () => {
        const mockGoal = {
            description: "my goal",
            value: "notANumber",
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation with a invalid type", async () => {
        const mockGoal = {
            description: "my goal",
            value: 2000,
            type: "X",
            expire_at: "2030-10-10",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation with a invalid expire_at", async () => {
        const mockGoal = {
            description: "my goal",
            value: 2000,
            type: "A",
            expire_at: "notADate",
            wallet_id: 1,
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation with a invalid wallet_id", async () => {
        const mockGoal = {
            description: "my goal",
            value: 2000,
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: "notAId",
        };

        const response = await supertest(app).post("/api/goal").send(mockGoal);

        expect(response.statusCode).toEqual(422);
    });
});
