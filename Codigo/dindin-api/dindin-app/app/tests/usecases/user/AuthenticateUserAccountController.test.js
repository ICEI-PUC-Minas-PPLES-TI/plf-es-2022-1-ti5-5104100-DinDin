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

  it('should fail validation with a invalid email', async () => {
    const body = {
      email: "notAnEmail",
      password: "1234567890"
    }

    const response = await supertest(app)
      .post('/api/user/auth')
      .send(body);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with a little password', async () => {
    const body = {
      email: `${Math.random()}@email.com`,
      password: "1234567"
    }

    const response = await supertest(app)
      .post('/api/user/auth')
      .send(body);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation without password', async () => {
    const body = {
      email: "just@aEmail.com"
    }

    const response = await supertest(app)
      .post('/api/user/auth')
      .send(body);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation without email', async () => {
    const body = {
      password: "justAPassword"
    }

    const response = await supertest(app)
      .post('/api/user/auth')
      .send(body);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with email and password empty', async () => {
    const body = {
      email: "",
      password: ""
    }

    const response = await supertest(app)
      .post('/api/user/auth')
      .send(body);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with email and password null ', async () => {
    const body = {
      email: null,
      password: null
    }

    const response = await supertest(app)
      .post('/api/user/auth')
      .send(body);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with email and password undefined', async () => {
    const body = {
      email: undefined,
      password: undefined
    }

    const response = await supertest(app)
      .post('/api/user/auth')
      .send(body);

    expect(response.statusCode).toEqual(422);
  })

  it('should fail validation with a big email', async () => {
    const body = {
      email: `${Math.random()}@1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901.com`,
      password: "1234567"
    }

    const response = await supertest(app)
      .post('/api/user/auth')
      .send(body);

    expect(response.statusCode).toEqual(422);
  })
})
