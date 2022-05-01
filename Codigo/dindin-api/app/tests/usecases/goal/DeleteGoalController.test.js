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

describe("DELETE /goal/:id test suite", () => {
    it("should delete a goal", async () => {
        const mockGoal = {
            description: "goal to find",
            status: "PENDING",
            value: 2000,
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: 1,
        };
        const createdGoal = await Goal.create(mockGoal);

        const response = await request
            .delete("/api/goal/" + createdGoal.id)
            .send();

        expect(response.statusCode).toEqual(204);

        const tryToFindGoal = await Goal.findByPk(createdGoal.id);
        expect(tryToFindGoal).toBeNull();
    });

    it("should not find a non-existent goal when trying to delete it", async () => {
        const nonExistentId = 987654321;
        const response = await request
            .delete("/api/goal/" + nonExistentId)
            .send();

        expect(response.statusCode).toEqual(404);

        const tryToFindGoal = await Goal.findByPk(nonExistentId);
        expect(tryToFindGoal).toBeNull();
    });

    it("should fail when trying to delete goal with invalid id", async () => {
        let invalidId = 0;
        let response = await request.delete("/api/goal/" + invalidId).send();

        expect(response.statusCode).toEqual(422);

        invalidId = -1;
        response = await request.delete("/api/goal/" + invalidId).send();

        expect(response.statusCode).toEqual(422);

        invalidId = null;
        response = await request.delete("/api/goal/" + invalidId).send();

        expect(response.statusCode).toEqual(422);

        invalidId = undefined;
        response = await request.delete("/api/goal/" + invalidId).send();

        expect(response.statusCode).toEqual(422);
    });
});