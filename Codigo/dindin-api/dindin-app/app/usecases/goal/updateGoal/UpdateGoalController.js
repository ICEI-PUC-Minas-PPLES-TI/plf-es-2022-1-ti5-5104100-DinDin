const yup = require("yup");

const AppError = require("../../../errors/AppError");
const GoalUpdateUseCase = require("./UpdateGoalUseCase");
const FindGoalUseCase = require("../findGoal/FindGoalUseCase");
const statusEnum = ["FINISHED", "LOST", "PENDING"];
const typeEnum = ["A", "B"];

class UpdateGoalController {
  async update(request, response) {
    const id = request?.params?.id;
    if (!id || !(id > 0))
      return new AppError("Please send a valid id on url", 500);
    //check if goal exists...
    const findGoalUseCase = new FindGoalUseCase();
    await findGoalUseCase.find(id); //throw execption if not found

    const scheme = yup.object().shape({
      description: yup.string().max(30),
      value: yup.number("'value' must be numeric!"),
      status: yup
        .mixed()
        .oneOf(statusEnum, `'status' must be one of these: ${statusEnum}.`),
      type: yup
        .mixed()
        .oneOf(typeEnum, `'type' must be one of these: ${typeEnum}.`),
      expire_at: yup.date("'expire_at' must be date!"),
      wallet_id: yup.number("'usuario_id_medico' must be numeric!").nullable(), // nullable por enquanto trocar depois...
    });

    try {
      await scheme.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }

    const { description, value, status, type, expire_at, wallet_id } =
      request.body;

    const goalUpdateUseCase = new GoalUpdateUseCase();
    const goal = await goalUpdateUseCase.update(
      id,
      description,
      value,
      status,
      type,
      expire_at,
      wallet_id
    );

    return response.status(200).json({
      goal,
    });
  }
}

module.exports = UpdateGoalController;
