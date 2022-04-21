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

describe('POST /user test suite', () => {

  it('should create a new user with success', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: `${Math.random()}@email.com`,
        password: 'userTestePassword'
      });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('user.id');
  });

  it('should fail to create user as it did not send the name field', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        email: `${Math.random()}@email.com`,
        password: 'userTestePassword'
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user with empty name field', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: '',
        email: `${Math.random()}@email.com`,
        password: 'userTestePassword'
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user as it did not send the email field', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        password: 'userTestePassword'
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user with empty email field', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: '',
        password: 'userTestePassword'
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user as it did not send the password field', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: `${Math.random()}@email.com`,
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user with empty password field', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: `${Math.random()}@email.com`,
        password: ''
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user with invalid email field', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: "invalidEmail.com",
        password: 'userTestePassword'
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user with name field more than 100 characters', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
        email: `${Math.random()}@email.com`,
        password: '1234567'
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user with email field more than 150 characters', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: `${Math.random()}@1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901.com`,
        password: '1234567'
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user with password field less than 8 characters', async () => {
    const response = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: `${Math.random()}@email.com`,
        password: '1234567'
      });
    expect(response.statusCode).toEqual(422);
  });

  it('should fail to create user with already used email', async () => {
    const email = "email@email.com";
    const responseOne = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: email,
        password: 'userTestePassword'
      });
    expect(responseOne.statusCode).toEqual(201);
    expect(responseOne.body).toHaveProperty('user.id');
    const responseTwo = await supertest(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: email,
        password: 'userTestePassword'
      });
    expect(responseTwo.statusCode).toEqual(409);
  });

})
