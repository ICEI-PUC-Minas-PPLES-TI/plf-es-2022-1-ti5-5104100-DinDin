async function getToken(supertest, app) {
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

    return response.body.token;
}
