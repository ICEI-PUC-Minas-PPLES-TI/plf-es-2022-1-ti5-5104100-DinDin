require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

const mockGoalIds = [];
let walletIdToSearch;
const toDeleteGoal = {
    goal: 0,
    wallet: 0
}

beforeAll(async () => {
    userId = (await connectAndLogin()).userId;

    for (let i = 0; i < 5; i++) {

        const response = await request.post("/api/wallet").send( {
            description: `mockup wallet to goal test ${i}`,
            initial_value: 2000,
        });

        const goalResponse = await request.post("/api/goal").send({
            description: `mockup goal to  test ${i}`,
            value: 2000,
            type: "A",
            expire_at: "2030-10-10",
            wallet_id: response.body.wallet.id,
        });
        if (i === 2){
            toDeleteGoal.wallet = response.body.wallet.id,
            toDeleteGoal.goal = goalResponse.body.id
        }
        walletIdToSearch = response.body.wallet.id;
        mockGoalIds.push(goalResponse.body.id);

    }
    // dando update para filtro com updated_at
    await request.put(`/api/goal/${mockGoalIds[1]}`).send({
        type: "B",
    });
    // deletando um para filtro deleted_at
    await request.delete(`/api/goal/${toDeleteGoal.goal}`);
    
});

afterAll(async () => {
    await close();
});

describe("GET /goal test suite", () => {
    it("should list user's goals", async () => {
        const response = await request.get("/api/goal/").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
        response.body.goals.forEach(goal => {
            expect(mockGoalIds).toContain(Number(goal.id));
        });
    });

    it("should list the user's goals with limit", async () => {
        const response = await request.get("/api/goal?limit=1").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list the user's goals with asc order id", async () => {
        const response = await request
            .get("/api/goal?attribute=id&order=ASC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(Number(response.body.goals[0].id)).toEqual(mockGoalIds[0]);
    });

    it("should list user's goals with desc order id", async () => {
        const response = await request
            .get("/api/goal?attribute=id&order=DESC")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(Number(response.body.goals[0].id)).toEqual( mockGoalIds[mockGoalIds.length-1] );
    });

    it("should list user's goals with description search", async () => {
        const response = await request
            .get("/api/goal?description=1")
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list user's goals with value search", async () => {
        const response = await request.get("/api/goal?value=2000").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list user's goals with status search", async () => {
        const response = await request.get("/api/goal?status=PENDING").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list user's goals with type search", async () => {
        const response = await request.get("/api/goal?type=A").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list user's goals between a expire_at search", async () => {
        const response = await request
            .get(
                "/api/goal?expire_at_start=2010-01-01 11:50:00&expire_at_end=2099-01-01 11:50:00"
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list user's goals with wallet_id search", async () => {
        const response = await request.get(`/api/goal?wallet_id=${walletIdToSearch}`).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list user's goals between a created_at search", async () => {
        const response = await request
            .get(
                "/api/goal?created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00"
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list user's goals between a updated_at search", async () => {
        const response = await request
            .get(
                "/api/goal?updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00"
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list user's goals between a deleted_at search", async () => {
        const response = await request
            .get(
                "/api/goal?deleted_at_start=2010-01-01 11:50:00&deleted_at_end=2099-01-01 11:50:00"
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });

    it("should list user's goals with all filters", async () => {
        const response = await request
            .get(
                `/api/goal?page=1&limit=5&attribute=id&order=DESC&description=goal&value=2000&status=PENDING&type=A&expire_at_start=2010-01-01 11:50:00&expire_at_end=2099-01-01 11:50:00&wallet_id=${toDeleteGoal.wallet}&created_at_start=2010-01-01 11:50:00&created_at_end=2099-01-01 11:50:00&updated_at_start=2010-01-01 11:50:00&updated_at_end=2099-01-01 11:50:00&deleted_at_start=2010-01-01 11:50:00&deleted_at_end=2099-01-01 11:50:00`
            )
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("goals");
        expect(response.body.goals.length).toBeGreaterThanOrEqual(1);
    });
});
