const yup = require("yup");

const AppError = require("../../../errors/AppError");
const UpdateGoalUseCase = require("./UpdateGoalUseCase");

const typeEnum = ["A", "B"];

class UpdateGoalController {
    async update(request, response) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const scheme = yup.object().shape({
            description: yup.string("'description' must be string!").max(30),
            value: yup.number("'value' must be numeric!"),
            type: yup
                .mixed()
                .oneOf(typeEnum, `'type' must be one of these: ${typeEnum}.`),
            expire_at: yup
                .date("'expire_at' must be date!")
                .min(today, "expire_at' cannot be in the past"),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { description, value, type, expire_at } = request.body;

        const id = request?.params?.id;
        if (!id || !(id > 0))
            throw new AppError("Please send a valid id on url", 422);

        const updateGoalUseCase = new UpdateGoalUseCase();
        const goal = await updateGoalUseCase.update(
            id,
            description,
            value,
            type,
            expire_at
        );

        return response.status(200).json(goal);
    }
}

module.exports = UpdateGoalController;
