const yup = require("yup");

const ListWalletUsersUseCase = require("./ListWalletUsersUseCase");
const AppError = require("../../../errors/AppError");

class ListWalletUsersController {
    async listUsers(request, response) {
        const scheme = yup.object().shape({
            id: yup.number("'id' must be numeric!").min(1).required(),
        });

        try {
            await scheme.validate(request.params, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { id } = request.params;

        const listWalletUsersUseCase = new ListWalletUsersUseCase();
        const list = await listWalletUsersUseCase.list(id);

        return response.status(200).json(list);
    }
}

module.exports = ListWalletUsersController;
