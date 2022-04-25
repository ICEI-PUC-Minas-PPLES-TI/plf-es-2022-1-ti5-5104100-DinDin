const yup = require("yup");

const AppError = require("../../../errors/AppError");
const UpdateCategoryUseCase = require("./UpdateCategoryUseCase");

class UpdateCategoryController {
    async update(request, response) {
        const scheme = yup.object().shape({
            description: yup.string().max(100),
            type: yup.mixed().oneOf(["IN", "OUT"]),
            color: yup.string().max(10),
        });
        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { description, type, color } = request.body;

        // if(user_id && user_id != 1 && user_id != 2){
        //   throw new AppError("'user_id' does not exist", 422);
        // }

        // if (wallet_id && wallet_id != 1 && wallet_id != 2){
        //   throw new AppError("'wallet_id' does not exist", 422);
        // }

        const id = request?.params?.id;
        if (!id || !(id > 0))
            return new AppError("Please send a valid id on url", 422);

        const updateCategoryUseCase = new UpdateCategoryUseCase();

        const category = await updateCategoryUseCase.update(
            id,
            description,
            type,
            color
        );

        return response.status(201).json(category);
    }
}

module.exports = UpdateCategoryController;
