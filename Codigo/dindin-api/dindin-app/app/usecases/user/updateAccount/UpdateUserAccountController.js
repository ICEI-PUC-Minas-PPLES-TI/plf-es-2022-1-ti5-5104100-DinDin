const yup = require("yup");

const AppError = require("../../../errors/AppError");
const UpdateUserAccountUseCase = require("./UpdateUserAccountUseCase");

class UpdateUserAccountController {
    async update(request, response) {
        const scheme = yup.object().shape({
            name: yup.string("'name' must be string").max(100),
            password: yup.string("'password' must be string").min(8),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { name, password } = request.body;
        const id = request.params.id;
        if (!id || !(id > 0))
            throw new AppError("Please send a valid id on url", 422);

        const updateUserAccountUseCase = new UpdateUserAccountUseCase();
        const user = await updateUserAccountUseCase.update(id, name, password);

        return response.status(200).json({
            user,
        });
    }
}

module.exports = UpdateUserAccountController;
