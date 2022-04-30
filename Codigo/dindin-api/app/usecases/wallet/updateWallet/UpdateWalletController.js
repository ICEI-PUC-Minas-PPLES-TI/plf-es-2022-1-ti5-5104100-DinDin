const yup = require("yup");

const AppError = require("../../../errors/AppError");

const UpdateWalletUseCase = require("./UpdateWalletUseCase");

class UpdateWalletController {
    async update(request, response) {
        const scheme = yup.object().shape({
            description: yup
                .string("'description' must be string!")
                .max(30)
                .required("'description' is a required field"),
        });

        const schemeParam = yup.object().shape({
            id: yup.number("'id' must be numeric!").min(1).required(),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
            await schemeParam.validate(request.params, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { id } = request.params;
        const { description } = request.body;
        const updateWalletUseCase = new UpdateWalletUseCase();
        const wallet = await updateWalletUseCase.update(id, description);

        return response.status(200).json({
            wallet,
        });
    }
}

module.exports = UpdateWalletController;
