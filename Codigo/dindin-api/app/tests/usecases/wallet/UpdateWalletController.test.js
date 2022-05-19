require("dotenv").config();

let { request, connectAndLogin } = require("../../helpers/AuthUtil");
const { close } = require("../../../database");

beforeAll(async () => {
    await connectAndLogin();
});

afterAll(async () => {
    await close();
});

describe("put /wallet test suite", () => {
    it("should update an wallet a description of my1wallet to my2wallet", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };
        //const createdWallet = await Wallet.create(mockWallet);
        const responseCreateWallet = await request
            .post("/api/wallet")
            .send(mockWallet);

        mockWallet.description = "my2wallet";
        delete mockWallet.initial_value;

        const response = await request
            .put("/api/wallet/" + responseCreateWallet.body.wallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(200);
        expect(response.body.wallet.description).toEqual(
            mockWallet.description
        );
        //expect(response.body.initial_value).toEqual(mockWallet.initial_value);
    });

    it("should update an wallet a description of my2wallet to my3wallet", async () => {
        const mockWallet = {
            description: "my2wallet",
            initial_value: 2000,
        };
        //const createdWallet = await Wallet.create(mockWallet);
        const responseCreateWallet = await request
            .post("/api/wallet")
            .send(mockWallet);

        mockWallet.description = "my3wallet";
        delete mockWallet.initial_value;

        const response = await request
            .put("/api/wallet/" + responseCreateWallet.body.wallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(200);
        expect(response.body.wallet.description).toEqual(
            mockWallet.description
        );
        //expect(response.body.initial_value).toEqual(mockWallet.initial_value);
    });

    it("should update an wallet a description of mywallet8 to mywallet9", async () => {
        const mockWallet = {
            description: "mywallet8",
            initial_value: 2000,
        };
        //const createdWallet = await Wallet.create(mockWallet);
        const responseCreateWallet = await request
            .post("/api/wallet")
            .send(mockWallet);

        mockWallet.description = "mywallet9";
        delete mockWallet.initial_value;

        const response = await request
            .put("/api/wallet/" + responseCreateWallet.body.wallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(200);
        expect(response.body.wallet.description).toEqual(
            mockWallet.description
        );
        //expect(response.body.initial_value).toEqual(mockWallet.initial_value);
    });

    it("should fail validation to update send empty description", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };

        const createdWalletRequest = await request
            .post("/api/wallet")
            .send(mockWallet);

        const createdWallet = createdWalletRequest.body.wallet;

        mockWallet.description = "";

        const response = await request
            .put("/api/wallet/" + createdWallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });

    it("should fail validation to update send null description", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };
        const createdWalletRequest = await request
            .post("/api/wallet")
            .send(mockWallet);

        const createdWallet = createdWalletRequest.body.wallet;

        mockWallet.description = null;

        const response = await request
            .put("/api/wallet/" + createdWallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(422);
    });

    it("should not update an wallet initial value", async () => {
        const mockWallet = {
            description: "my1wallet",
            initial_value: 2000,
        };
        const createdWalletRequest = await request
            .post("/api/wallet")
            .send(mockWallet);

        const createdWallet = createdWalletRequest.body.wallet;

        mockWallet.description = "my2wallet";
        mockWallet.initial_value = 3000;

        const response = await request
            .put("/api/wallet/" + createdWallet.id)
            .send(mockWallet);

        expect(response.statusCode).toEqual(200);
        expect(response.body.wallet.description).toEqual(
            mockWallet.description
        );
        expect(response.body.wallet.initial_value).not.toEqual(
            mockWallet.initial_value
        );
    });
});
