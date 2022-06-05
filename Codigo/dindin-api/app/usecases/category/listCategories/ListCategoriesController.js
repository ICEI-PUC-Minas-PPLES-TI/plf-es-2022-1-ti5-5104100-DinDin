const yup = require("yup");
const AppError = require("../../../errors/AppError");
const ListCategoriesUseCase = require("./ListCategoriesUseCase");

const orderEnum = ["ASC", "DESC"];

const typeEnum = ["IN", "OUT"];

class ListCategoriesController {
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

            user_id: yup.number("'user_id' must be numeric!"),
            description: yup.string().max(100),
            color: yup.string().min(6).max(6),
            type: yup
                .mixed()
                .oneOf(typeEnum, `'type' must be one of these: ${typeEnum}.`),

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
        const listCategoriesUseCase = new ListCategoriesUseCase();
        const categories = await listCategoriesUseCase.list(
            request.query,
            request.params.id
        );
        return response.status(200).json(categories);
    }
}

module.exports = ListCategoriesController;
