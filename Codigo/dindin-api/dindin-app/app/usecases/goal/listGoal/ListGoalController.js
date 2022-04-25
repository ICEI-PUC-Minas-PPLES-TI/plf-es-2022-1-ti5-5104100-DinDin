const yup = require("yup");

const AppError = require("../../../errors/AppError");
const ListGoalUseCase = require("./ListGoalUseCase");

const orderEnum = ["ASC", "DESC"];

const statusEnum = ["FINISHED", "LOST", "PENDING"];
const typeEnum = ["A", "B"];

class ListGoalController {
    async list(request, response) {
        const scheme = yup.object().shape({
            page: yup.number("'value' must be numeric!"),
            limit: yup.number("'value' must be numeric!"),
            attribute: yup.string("'attribute' must be one string!"),
            order: yup
                .mixed()
                .oneOf(
                    orderEnum,
                    `'order' must be one of these: ${orderEnum}.`
                ),

            description: yup.string("'description' must be string!").max(30),
            value: yup.number("'value' must be numeric!"),
            status: yup
                .mixed()
                .oneOf(
                    statusEnum,
                    `'status' must be one of these: ${statusEnum}.`
                ),
            type: yup
                .mixed()
                .oneOf(typeEnum, `'type' must be one of these: ${typeEnum}.`),

            expire_at_start: yup.date("'expire_at_start' must be date!"),
            expire_at_end: yup.date("'expire_at_end' must be date!"),

            wallet_id: yup.number("'wallet_id' must be numeric!"),

            created_at_start: yup.date("'created_at_start' must be date!"),
            created_at_end: yup.date("'created_at_end' must be date!"),

            updated_at_start: yup.date("'updated_at_start' must be date!"),
            updated_at_end: yup.date("'updated_at_end' must be date!"),

            deleted_at_start: yup
                .date("'deleted_at_start' must be date!")
                .nullable(),
            deleted_at_end: yup
                .date("'deleted_at_end' must be date!")
                .nullable(),
        });

        try {
            await scheme.validate(request.query, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const listGoalUseCase = new ListGoalUseCase();
        const goals = await listGoalUseCase.list(request.query);

        return response.status(200).json(goals);
    }
}

module.exports = ListGoalController;
