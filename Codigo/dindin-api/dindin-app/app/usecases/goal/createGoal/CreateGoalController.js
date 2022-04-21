const yup = require("yup");

const AppError = require("../../../errors/AppError");
const CreateGoalUseCase = require("./CreateGoalUseCase");

const typeEnum = ["A", "B"];

class CreateGoalController {
  async create(request, response) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const scheme = yup.object().shape({
      description: yup.string("'description' must be string!").required().max(30),
      value: yup.number("'value' must be numeric!").required(),
      type: yup
        .mixed()
        .oneOf(typeEnum, `'type' must be one of these: ${typeEnum}.`).required(),
      expire_at: yup.date("'expire_at' must be date!").min(today, "expire_at' cannot be in the past").required(),
      wallet_id: yup.number("'wallet_id' must be numeric!").required(),
    });

    try {
      await scheme.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }

    const { description, value, type, expire_at, wallet_id } = request.body;

    // ! Fix check if wallet exist
    const wallet = "findWalletUseCase.find(wallet_id)";
    if (wallet_id != 1)
      throw new AppError("'wallet_id' does not exist", 422);

    const createGoalUseCase = new CreateGoalUseCase();
    const goal = await createGoalUseCase.create(
      description,
      value,
      type,
      expire_at,
      wallet_id
    );

    return response.status(201).json({
      goal,
    });
  }
}

module.exports = CreateGoalController;
