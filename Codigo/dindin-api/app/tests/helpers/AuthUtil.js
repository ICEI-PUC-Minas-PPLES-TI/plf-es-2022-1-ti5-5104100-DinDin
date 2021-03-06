const supertest = require("supertest"); // "requester"
require("dotenv").config();

const app = require("../..");
const { connect } = require("../../database");
const defaults = require("superagent-defaults");
const request = defaults(supertest(app)); // or url

async function connectAndLogin() {
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
    const userId = response.body.userId;
    request.set("authorization", response.body.token);

    return {
        userId,
        mockmail,
        mockPassword,
    };
}

module.exports = { request, connectAndLogin };
