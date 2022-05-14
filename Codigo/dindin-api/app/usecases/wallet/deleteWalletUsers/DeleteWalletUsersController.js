const yup = require("yup");

const AppError = require("../../../errors/AppError");

const DeleteWalletUsersUseCase = require("./DeleteWalletUsersUseCase");

class DeleteWalletUsersController {
    async delete(request, response) {
        const scheme = yup.object().shape({
            userId: yup.number("'userId' must be numeric!").min(1).required(),
        });

        try {
            await scheme.validate(request.params, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { id, userId } = request.params;

        const deleteWalletUsersUseCase = new DeleteWalletUsersUseCase();
        await deleteWalletUsersUseCase.delete(id, userId, request.userId);

        return response.status(204).json();
    }
}

module.exports = DeleteWalletUsersController;
