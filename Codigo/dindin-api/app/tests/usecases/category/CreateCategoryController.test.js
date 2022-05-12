require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

const Category = require("../../../models/Category");

beforeAll(async () => {
    await connectAndLogin();
});

afterAll(async () => {
    await close();
});

describe("POST /goal test suite", () => {
//     it("should create a new category IN", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 1,
//             wallet_id: 1,
//             description: "teste IN",
//             type: "IN",
//             color: "FF0000",
//         });
//         expect(response.statusCode).toEqual(201);
//         expect(response.body).toHaveProperty("id");
//         const createdCategory = await Category.findByPk(
//             parseInt(response.body.id)
//         );
//         expect(createdCategory.dataValues.user_id).toEqual(1);
//         expect(createdCategory.dataValues.wallet_id).toEqual("1");
//         expect(createdCategory.dataValues.description).toEqual("teste IN");
//         expect(createdCategory.dataValues.type).toEqual("IN");
//         expect(createdCategory.dataValues.color).toEqual("FF0000");
//     });

//     it("should create a new category OUT", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 2,
//             wallet_id: 2,
//             description: "teste OUT",
//             type: "OUT",
//             color: "000000",
    //         });
    //         expect(response.statusCode).toEqual(201);
    //         expect(response.body).toHaveProperty("id");
    //         const createdCategory = await Category.findByPk(
//             parseInt(response.body.id)
//         );
//         expect(createdCategory.dataValues.user_id).toEqual(2);
//         expect(createdCategory.dataValues.wallet_id).toEqual("2");
//         expect(createdCategory.dataValues.description).toEqual("teste OUT");
//         expect(createdCategory.dataValues.type).toEqual("OUT");
//         expect(createdCategory.dataValues.color).toEqual("000000");
//     });

//     it("should fail validation missing user_id", async () => {
//         const response = await request.post("/api/category").send({
//             wallet_id: 1,
//             description: "teste",
//             type: "IN",
//             color: "FF0000",
//         });
//         expect(response.statusCode).toEqual(422);
//     });

//     it("should fail validation missing wallet_id", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 1,
//             description: "teste",
//             type: "IN",
//             color: "FF0000",
//         });
//         expect(response.statusCode).toEqual(422);
//     });

//     it("should fail validation missing description", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 1,
//             wallet_id: 1,
//             type: "OUT",
//             color: "FF0000",
//         });
//         expect(response.statusCode).toEqual(422);
//     });

//     it("should fail validation missing type", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 1,
//             wallet_id: 1,
//             description: "teste",
//             color: "FF0000",
//         });
//         expect(response.statusCode).toEqual(422);
//     });

//     it("should fail validation with big description", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 1,
//             wallet_id: 1,
//             description: "MaisDe30CaracteresParaRetornar422",
//             type: "OUT",
//             color: "FF0000",
//         });
//         expect(response.statusCode).toEqual(422);
//     });

//     it("should not create a new category with invalid type", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 1,
//             wallet_id: 1,
//             description: "test",
//             type: "invalid",
//             color: "FF0000",
//         });
//         expect(response.statusCode).toEqual(422);
//     });

//     it("should not create a new category with invalid color (small)", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 1,
//             wallet_id: 1,
//             description: "test",
//             type: "OUT",
//             color: "so3",
//         });
//         expect(response.statusCode).toEqual(422);
//     });

//     it("should not create a new category with invalid color (big)", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 1,
//             wallet_id: 1,
//             description: "test",
//             type: "OUT",
//             color: "maisde6",
//         });
//         expect(response.statusCode).toEqual(422);
//     });

//     it("should not create a new category with not existent user id", async () => {
//         const response = await request.post("/api/category").send({
//             user_id: 53219872725,
//             wallet_id: 1,
//             description: "test",
//             type: "OUT",
//             color: "FFF000",
//         });
//         expect(response.statusCode).toEqual(404);
//     });
});
