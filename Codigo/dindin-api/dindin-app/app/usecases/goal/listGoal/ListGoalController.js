const yup = require("yup");
const AppError = require("../../../errors/AppError");
const ListGoalUseCase = require("./ListGoalUseCase");
const statusEnum = ["FINISHED", "LOST", "PENDING"];
const typeEnum = ["A", "B"];
class ListGoalController {
  async list(request, response) {

    const scheme = yup.object().shape({
      page: yup.number("'value' must be numeric!"),
      limit: yup.number("'value' must be numeric!"),
      description: yup.string().max(30),
      status: yup
        .mixed()
        .oneOf(statusEnum, `'status' must be one of these: ${statusEnum}.`),
      type: yup
        .mixed()
        .oneOf(typeEnum, `'type' must be one of these: ${typeEnum}.`),
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
