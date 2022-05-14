require("dotenv").config();
let { connectAndLogin } = require("../../helpers/AuthUtil");

//let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

//const Category = require("../../../models/Category");

beforeAll(async () => {
    await connectAndLogin();
});

afterAll(async () => {
    await close();
});

describe("GET /category/:id test suite", () => {
    //     it("should find and return the category", async () => {
    //         const mockCategory = {
    //             user_id: 1,
    //             wallet_id: 1,
    //             description: "teste",
    //             type: "IN",
    //             color: "FFF000",
    //         };
    //         const createdCategory = await Category.create(mockCategory);
    //         const response = await request
    //             .get("/api/category/" + createdCategory.id)
    //             .send();
    //         expect(response.statusCode).toEqual(200);
    //         expect(response.body.user_id).toEqual(mockCategory.user_id);
    //         expect(response.body.wallet_id.toString()).toEqual(
    //             mockCategory.wallet_id.toString()
    //         );
    //         expect(response.body.description).toEqual(mockCategory.description);
    //         expect(response.body.type).toEqual(mockCategory.type);
    //         expect(response.body.color).toEqual(mockCategory.color);
    //     });
    //     it("should not find a category", async () => {
    //         const unexistingCategoryId = 987654321;
    //         const response = await request
    //             .get("/api/category/" + unexistingCategoryId)
    //             .send();
    //         expect(response.statusCode).toEqual(404);
    //     });
    //     it("should fail when trying to find category with invalid id", async () => {
    //         let invalidId = 0;
    //         let response = await request.get("/api/category/" + invalidId).send();
    //         expect(response.statusCode).toEqual(422);
    //         invalidId = -1;
    //         response = await request.get("/api/category/" + invalidId).send();
    //         expect(response.statusCode).toEqual(422);
    //         invalidId = null;
    //         response = await request.get("/api/category/" + invalidId).send();
    //         expect(response.statusCode).toEqual(422);
    //         invalidId = undefined;
    //         response = await request.get("/api/category/" + invalidId).send();
    //         expect(response.statusCode).toEqual(422);
    //     });
});
