const supertest = require("supertest"); // "requester"
require("dotenv").config();

const app = require("../../..");
const { connect, close } = require("../../../database");
const User = require("../../../models/User");

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await close();
});

describe("PUT /user test suite", () => {
    it("should update a user with success", async () => {
        const response = await supertest(app).put("/api/user/1").send({
            name: "User test updated",
            password: "userTestePasswordUpdated",
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should fail trying to update a non-existent user", async () => {
        const nonExistentId = 987654321;
        const response = await supertest(app)
            .put(`/api/user/${nonExistentId}`)
            .send({
                name: "User test updated",
                password: "userTestePasswordUpdated",
            });
        expect(response.statusCode).toEqual(404);
    });

    it("should not fail to update user as it did not send the name field", async () => {
        const response = await supertest(app).put("/api/user/1").send({
            password: "userTestePasswordUpdated",
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should not fail to update user as it did not send the password field", async () => {
        const response = await supertest(app).put("/api/user/1").send({
            name: "User test updated",
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should not update a user email", async () => {
        const user = await User.findByPk(1);
        const oldEmail = user.email;
        const response = await supertest(app)
            .put("/api/user/1")
            .send({
                name: "User test updated",
                email: `updated${Math.random()}@email.com`,
                password: "userTestePasswordUpdated",
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
        const getResponse = await supertest(app).get("/api/user/1");
        expect(getResponse.body.email).toEqual(oldEmail);
    });

    it("should fail to update user with empty password field", async () => {
        const response = await supertest(app).put("/api/user/1").send({
            password: "",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should fail to update user with name field more than 100 characters", async () => {
        const response = await supertest(app).put("/api/user/1").send({
            name: "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should fail to update user with password field less than 8 characters", async () => {
        const response = await supertest(app).put("/api/user/1").send({
            password: "1234567",
        });
        expect(response.statusCode).toEqual(422);
    });
});
