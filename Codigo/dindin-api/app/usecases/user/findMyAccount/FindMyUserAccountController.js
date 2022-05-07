const AppError = require("../../../errors/AppError");
const FindUserAccountUseCase = require("../findAccount/FindUserAccountUseCase");

class FindMyUserAccountController {
    async find(request, response) {
        //const id = request.params.id;
        const id = request.userId;
        if (!id || !(id > 0))
            throw new AppError("Please send a valid id on url", 422);
        const findUserAccountUseCase = new FindUserAccountUseCase();
        const user = await findUserAccountUseCase.find(id);
        return response.status(200).json(user);
    }
}

module.exports = FindMyUserAccountController;
