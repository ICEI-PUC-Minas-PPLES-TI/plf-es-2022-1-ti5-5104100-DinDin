const ListWalletUsersUseCase = require("./ListWalletUsersUseCase");

class ListWalletUsersController {
    async listUsers(request, response) {
        const { id } = request.params;

        const listWalletUsersUseCase = new ListWalletUsersUseCase();
        const list = await listWalletUsersUseCase.list(id);

        return response.status(200).json(list);
    }
}

module.exports = ListWalletUsersController;
