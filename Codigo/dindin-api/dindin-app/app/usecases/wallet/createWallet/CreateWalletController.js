const yup = require("yup");

const AppError = require("../../../errors/AppError");

const CreateWalletUseCase = require("./CreateWalletUseCase");

class CreateWalletController {
    async create(request, response) {
        const scheme = yup.object().shape({
            description: yup
                .string("'description' must be string!")
                .max(30)
                .required("'description' is a required field"),
            initial_value: yup
                .number("'initial_value' must be numeric!")
                .required(),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { description, initial_value } = request.body;

        const createWalletUseCase = new CreateWalletUseCase();
        const wallet = await createWalletUseCase.create(
            description,
            false, // It shouldn't start shared
            initial_value,
            request.userId
        );

        return response.status(201).json({
            wallet,
        });
    }
}

module.exports = CreateWalletController;
