require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

const Goal = require("../../../models/Goal");

let walletToCreate;

beforeAll(async () => {
    await connectAndLogin();

    const response = await request.post("/api/wallet").send({
        description: `wallet to goal delete test`,
        initial_value: 2000,
    });
    walletToCreate = response.body.wallet.id;
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
            wallet_id: walletToCreate,
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

    it("should not return a goal that the user does not have permission", async () => {
        const response = await request
            .get("/api/goal/" + 1)
            .send();

        expect(response.statusCode).toEqual(403);
    });
});
