const supertest = require("supertest"); // "requester"
require("dotenv").config();

const app = require("../..");
const { connect } = require("../../database");
var defaults = require("superagent-defaults");
var request = defaults(supertest(app)); // or url

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
    request.set("Authorization", response.body.token);

    return {
        mockmail,
        mockPassword,
        userId: response.body.userId
    };
}

module.exports = { request, connectAndLogin };
