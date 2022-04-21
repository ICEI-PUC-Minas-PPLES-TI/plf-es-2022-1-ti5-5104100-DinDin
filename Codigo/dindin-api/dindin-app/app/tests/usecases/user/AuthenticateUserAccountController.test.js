const supertest = require('supertest'); // "requester"
require("dotenv").config();

const app = require('../../..');
const { connect, close } = require('../../../database');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

describe('POST /user/auth test suite', () => {
  it('should authenticate a created user', async () => {
    const mockmail = `${Math.random()}@email.com`;
    const mockPassword = `${Math.random()}@ultrapassword`;

    await supertest(app)
      .post('/api/user')
      .send({
        name: 'User Test',
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
    const mockmail = `${Math.random()}@email.com`;
    const mockPassword = `${Math.random()}@ultrapassword`;
    const mockWrongPassword = `wrong@ultrapassword`;

    await supertest(app)
      .post('/api/user/auth')
      .send({
        name: 'User Test',
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
    const mockmail = `${Math.random()}@email.com.br`;
    const mockPassword = `${Math.random()}@ultrapassword`;
    const mockWrongMail = `${Math.random()}@email.com.br`;
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

  it('should fail validation', async () => {
    const failValidationObjects = [
      {
        email: "notAnEmail",
        password: "1234567890"
      },
      {
        email: "just@aEmail.com"
      },
      {
        password: "justAPassword"
      },
      {
        email: "",
        password: ""
      },
      {
        email: null,
        password: null
      },
      {
        email: undefined,
        password: undefined
      },
      {
        email: `${Math.random()}@1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901.com`,
        password: "1234567"
      },
      {
        email: `${Math.random()}@email.com`,
        password: "1234567"
      }
    ];

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
