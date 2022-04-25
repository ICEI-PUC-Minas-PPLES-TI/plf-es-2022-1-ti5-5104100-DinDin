const yup = require("yup");

const AppError = require("../../../errors/AppError");
const UpdateCategoryUseCase = require("./UpdateCategoryUseCase");

class UpdateCategoryController {
    async update(request, response) {
        const scheme = yup.object().shape({
            description: yup.string("'description' must be string!").max(30),
            type: yup.mixed().oneOf(["IN", "OUT"]),
            color: yup.string("'color' must be string!").max(6).min(6),
        });
        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { description, type, color } = request.body;

        const id = request?.params?.id;
        if (!id || !(id > 0))
            throw new AppError("Please send a valid id on url", 422);

        const updateCategoryUseCase = new UpdateCategoryUseCase();

        const category = await updateCategoryUseCase.update(
            id,
            description,
            type,
            color
        );

        return response.status(200).json(category);
    }
}

module.exports = UpdateCategoryController;
