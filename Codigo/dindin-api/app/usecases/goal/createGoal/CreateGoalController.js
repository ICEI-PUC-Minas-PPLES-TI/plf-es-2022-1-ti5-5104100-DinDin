const yup = require("yup");

const AppError = require("../../../errors/AppError");
const FindWalletUseCase = require("../../wallet/findWallet/FindWalletUseCase");
const CreateGoalUseCase = require("./CreateGoalUseCase");

const typeEnum = ["A", "B"];

class CreateGoalController {
    async create(request, response) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const scheme = yup.object().shape({
            description: yup
                .string("'description' must be string!")
                .max(30)
                .required("'description' is a required field"),
            value: yup.number("'value' must be numeric!").required(),
            type: yup
                .mixed()
                .oneOf(typeEnum, `'type' must be one of these: ${typeEnum}.`)
                .required("'type' is a required field"),
            expire_at: yup
                .date("'expire_at' must be date!")
                .min(today, "expire_at' cannot be in the past")
                .required("'expire_at' is a required field"),
            wallet_id: yup
                .number("'wallet_id' must be numeric!")
                .required("'wallet_id' is a required field"),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { description, value, type, expire_at, wallet_id } = request.body;

        const findWalletUseCase = new FindWalletUseCase();

        try {
            await findWalletUseCase.find(wallet_id);
        } catch (error) {
            throw new AppError("'wallet_id' does not exist", 422);
        }

        const createGoalUseCase = new CreateGoalUseCase();
        const goal = await createGoalUseCase.create(
            description,
            value,
            type,
            expire_at,
            wallet_id
        );

        return response.status(201).json(goal);
    }
}

module.exports = CreateGoalController;
