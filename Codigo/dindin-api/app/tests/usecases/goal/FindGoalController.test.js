require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

const Goal = require("../../../models/Goal");

beforeAll(async () => {
    await connectAndLogin();
});

afterAll(async () => {
    await close();
});

describe("GET /goal/:id test suite", () => {
    it("should find and return the goal", async () => {
        const mockGoal = {
            description: "goal to find",
            status: "PENDING",
            value: 2000,
            type: "B",
            expire_at: "2031-12-12T00:00:00.000Z",
            wallet_id: 1,
        };
        const createdGoal = await Goal.create(mockGoal);

        const response = await request
            .get("/api/goal/" + createdGoal.id)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.description).toEqual(mockGoal.description);
        expect(response.body.value).toEqual(mockGoal.value);
        expect(response.body.type).toEqual(mockGoal.type);
        expect(response.body.expire_at).toEqual(mockGoal.expire_at);
    });

    it("should not find a goal", async () => {
        const unexistingGoalId = 987654321;
        const response = await request
            .get("/api/goal/" + unexistingGoalId)
            .send();

        expect(response.statusCode).toEqual(404);
    });

    it("should fail when trying to find goal with invalid id", async () => {
        let invalidId = 0;
        let response = await request.get("/api/goal/" + invalidId).send();
        expect(response.statusCode).toEqual(422);

        invalidId = -1;
        response = await request.get("/api/goal/" + invalidId).send();
        expect(response.statusCode).toEqual(422);

        invalidId = null;
        response = await request.get("/api/goal/" + invalidId).send();
        expect(response.statusCode).toEqual(422);

        invalidId = undefined;
        response = await request.get("/api/goal/" + invalidId).send();
        expect(response.statusCode).toEqual(422);
    });
});
