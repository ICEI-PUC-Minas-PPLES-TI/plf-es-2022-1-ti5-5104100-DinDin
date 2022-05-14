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

describe("DELETE /goal/:id test suite", () => {
    it("should delete a goal", async () => {
        const mockGoal = {
            description: "goal to find",
            status: "PENDING",
            value: 2000,
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: walletToCreate,
        };
        const createdGoal = await Goal.create(mockGoal);

        const response = await request
            .delete("/api/goal/" + createdGoal.id)
            .send();

        expect(response.statusCode).toEqual(204);

        const tryToFindGoal = await Goal.findByPk(createdGoal.id);
        expect(tryToFindGoal).toBeNull();
    });

    it("should not delete a goal that the user does not has access", async () => {
        const response = await request.delete("/api/goal/" + 1).send();

        expect(response.statusCode).toEqual(403);
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
});
