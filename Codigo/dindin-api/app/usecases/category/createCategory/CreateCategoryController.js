const yup = require("yup");

const AppError = require("../../../errors/AppError");
const CreateCategoryUseCase = require("./CreateCategoryUseCase");

const categoryTypes = ["IN", "OUT"];

class CreateCategoryController {
    async create(request, response) {
        const scheme = yup.object().shape({
            wallet_id: yup.number("'wallet_id' must be numeric!").required(),
            description: yup
                .string("'description' must be string!")
                .max(30)
                .required(),
            type: yup
                .mixed()
                .oneOf(
                    categoryTypes,
                    `'type' must be one of these: ${categoryTypes}.`
                )
                .required(),
            color: yup
                .string("'color' must be string!")
                .max(6)
                .min(6)
                .required(),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { description, type, color } = request.body;
        const wallet_id = request.params.id;
        const user_id = request.userId;

        const createCategoryUseCase = new CreateCategoryUseCase();
        const category = await createCategoryUseCase.create(
            wallet_id,
            user_id,
            description,
            type,
            color
        );

        return response.status(201).json(category);
    }
}

module.exports = CreateCategoryController;
