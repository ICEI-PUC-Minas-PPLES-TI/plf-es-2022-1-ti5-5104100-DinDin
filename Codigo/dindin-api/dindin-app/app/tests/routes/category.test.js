const supertest = require('supertest'); // "requester"
require("dotenv").config();

const app = require('../../');
const { connect, close } = require('../../database');

const Category = require('../../models/Category')

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await close();
});

describe('Category API', () => {
    it('should create a new category', async () => {
        const response = await supertest(app)
            .post('/api/category')
            .send({
                description: "teste",
                type: "IN",
                color: "qwe23"
            });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('id');
    })


    it('should not create a new category', async () => {
        const response = await supertest(app)
            .post('/api/category')
            .send({
                description: 'Category',
                color: '123123'
            });
        expect(response.statusCode).toEqual(422);
    })

    it("should update a category", async () => {
        const mockCategory = {
            description: "teste",
            type: "IN",
            color: "qwe23"
        }
        const createdCategory = await Category.create(mockCategory);

        mockCategory.description = 'Category Updated';
        mockCategory.color = '1233er'

        const response = await supertest(app)
            .put('/api/Category/' + createdCategory.id)
            .send(mockCategory);

        expect(response.statusCode).toEqual(201);
        expect(response.body.description).toEqual(mockCategory.description)
        expect(response.body.color).toEqual(mockCategory.color)

    })

    it('should show a category /api/category/1', async () => {
        const response = await supertest(app).get('/api/category/1');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('id');
    })


    it('should get all categories', async () => {
        const response = await supertest(app)
            .get('/api/category');
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    })

})