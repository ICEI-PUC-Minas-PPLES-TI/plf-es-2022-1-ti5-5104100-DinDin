require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

beforeAll(async () => {
    await connectAndLogin();
});

afterAll(async () => {
    await close();
});

describe("get one wallet test suite", () => {
    it("should get one wallet", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };
        //const createdWallet = await Wallet.create(mockWallet);
        const responseCreateWallet = await request
            .post("/api/wallet")
            .send(mockWallet);

        const response = await request
            .get("/api/wallet/" + responseCreateWallet.body.wallet.id)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("description");
        expect(response.body.description).toEqual(mockWallet.description);
        expect(response.body).toHaveProperty("initial_value");
        expect(response.body.initial_value).toEqual(mockWallet.initial_value);
        expect(response.body).toHaveProperty("created_at");
        expect(response.body).toHaveProperty("shared");
        expect(response.body).toHaveProperty("updated_at");
        //expect(response.body.initial_value).toEqual(mockWallet.initial_value);
    });
});
