require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

let mockPassword = "";
let mockmail = "";

beforeAll(async () => {
    const user = await connectAndLogin();
    mockPassword = user.mockPassword;
    mockmail = user.mockmail;
});

afterAll(async () => {
    await close();
});

describe("PUT /user test suite", () => {
    it("should update a user with success", async () => {
        const response = await request.put("/api/user").send({
            name: "User test updated",
            password: "userTestePasswordUpdated",
            oldPassword: mockPassword,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should fail trying to update the password without passing the current password", async () => {
        const response = await request.put(`/api/user`).send({
            name: "User test updated",
            password: "userTestePasswordUpdated",
        });
        expect(response.statusCode).toEqual(409);
    });

    it("should fail trying to update the password passing the wrong current password", async () => {
        const response = await request.put(`/api/user`).send({
            name: "User test updated",
            password: "userTestePasswordUpdated",
            oldPassword: "i_am_a_wrong_password",
        });
        expect(response.statusCode).toEqual(409);
    });

    it("should not fail to update user as it did not send the password field", async () => {
        const response = await request.put("/api/user").send({
            name: "User test updated",
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should not update a user email", async () => {
        const oldEmail = mockmail;
        const response = await request.put("/api/user").send({
            name: "User test updated",
            email: `updated${Math.random()}@email.com`,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
        const getResponse = await request.get("/api/user");
        expect(getResponse.statusCode).toEqual(200);
        expect(getResponse.body.email).toEqual(oldEmail);
    });

    it("should fail to update user with empty password field", async () => {
        const response = await request.put("/api/user").send({
            password: "",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should fail to update user with name field more than 100 characters", async () => {
        const response = await request.put("/api/user").send({
            name: "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901",
        });
        expect(response.statusCode).toEqual(422);
    });

    it("should fail to update user with password field less than 8 characters", async () => {
        const response = await request.put("/api/user").send({
            password: "1234567",
        });
        expect(response.statusCode).toEqual(422);
    });
});
