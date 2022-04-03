const supertest = require('supertest'); // "requester"
require("dotenv").config();

const app = require('../../');
const { connect, close } = require('../../database');

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await close();
});

describe('Category API', () => {
    it('should show a user /api/category/1', async () =>{
        const response = await supertest(app).get('/api/category/1');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('id');
    })

    it('should create a new category', async () => {
        const response = await supertest(app)
            .post('/api/category')
            .send({
                name: 'Category',
                color: 'BLACK'
            });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('category.id');
    })

    it('should get all categories', async() =>{
        const response = await supertest(app)
            .get('/api/category');
        expect(response.statusCode).toEqual(201);
        expect(response.body.length).not.toBe(0);
    })

})