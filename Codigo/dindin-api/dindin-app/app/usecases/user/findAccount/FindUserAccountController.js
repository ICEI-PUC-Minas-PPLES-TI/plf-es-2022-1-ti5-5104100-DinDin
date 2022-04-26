const FindUserAccountUseCase = require("./FindUserAccountUseCase");
const AppError = require("../../../errors/AppError");

class FindUserAccountController {
    async find(request, response) {
        const id = request.params.id;
        if (!id || !(id > 0))
            throw new AppError("Please send a valid id on url", 422);
        const findUserAccountUseCase = new FindUserAccountUseCase();
        const user = await findUserAccountUseCase.find(id);
        return response.status(200).json(user);
    }
}

module.exports = FindUserAccountController;
