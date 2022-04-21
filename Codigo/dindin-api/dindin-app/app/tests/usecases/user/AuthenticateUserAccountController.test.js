const supertest = require('supertest'); // "requester"
require("dotenv").config();

const app = require('../../..');
const { connect, close } = require('../../../database');
const User = require('../../../models/User');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

describe('POST /user/auth test suite', ()=>{
  it('should authenticate a created user', async () => {
    const mockmail = `${Math.random()}@protonmail.net`;
    const mockPassword = `${Math.random()}@ultrapassword`;

    await supertest(app)
        .post('/api/user')
        .send({
            name: 'Username da Silva',
            email: mockmail,
            password: mockPassword
        });

    const response = await supertest(app)
        .post('/api/user/auth')
        .send({
          email: mockmail,
          password: mockPassword
        });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("token");
  });

  it('should not authenticate a created user with wrong password', async () => {
    const mockmail = `${Math.random()}@protonmail.br`;
    const mockPassword = `${Math.random()}@ultrapassword`;
    const mockWrongPassword = `wrong@ultrapassword`;

    await supertest(app)
        .post('/api/user/auth')
        .send({
            name: 'Username dos Santos',
            email: mockmail,
            password: mockPassword
        });

    const response = await supertest(app)
        .post('/api/user/auth')
        .send({
          email: mockmail,
          password: mockWrongPassword
        });

    expect(response.statusCode).toEqual(401);
  });

  it('should not authenticate a created user with wrong email', async () => {
    const mockmail = `${Math.random()}@protonmail.com.br`;
    const mockPassword = `${Math.random()}@ultrapassword`;
    const mockWrongMail = `${Math.random()}@protonmail.com.br`;
    const mockWrongPassword = `${Math.random()}@thewrongpassword`

    await supertest(app)
        .post('/api/user/auth')
        .send({
            name: 'Username dos Santos',
            email: mockmail,
            password: mockPassword
        });

    const response = await supertest(app)
        .post('/api/user/auth')
        .send({
          email: mockWrongMail,
          password: mockWrongPassword
        });

    expect(response.statusCode).toEqual(401);
  });

  it('should fail validation', async () => {
    const failValidationObjects = [{ email: "notAnEmail" }, { password: 'justAPassword' }];

    await Promise.all(
      failValidationObjects.map(async (body) => {
        const response = await supertest(app)
            .post('/api/user/auth')
            .send(body);

        expect(response.statusCode).toEqual(422);
      })
    )

  });
})
