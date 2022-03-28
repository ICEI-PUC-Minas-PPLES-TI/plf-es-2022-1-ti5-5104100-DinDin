const yup = require("yup");

const AppError = require("../../errors/AppError");
const GoalUpdateUseCase = require("./GoalUpdateUseCase");
const GoalFindUseCase = require("../findGoal/GoalFindUseCase");
const statusEnum = ["FINISHED", "LOST", "PENDING"];
const typeEnum = ["A", "B"];

class GoalUpdateController {
  async update(request, response) {
    const id = request.params.id;
    //check if goal exists...
    const goalFindUseCase = new GoalFindUseCase();
    let findGoal = await goalFindUseCase.find(id);//throw execption if not found
    findGoal = null;
    goalFindUseCase = null;
    
    const scheme = yup.object().shape({
      description: yup.string().required().max(30),
      value: yup.number("'value' must be numeric!").required(),
      status: yup
        .mixed()
        .oneOf(statusEnum, `'status' must be one of these: ${statusEnum}.`)
        .required(),
      type: yup
        .mixed()
        .oneOf(typeEnum, `'type' must be one of these: ${typeEnum}.`)
        .required(),
      expire_at: yup.date("'expire_at' must be date!").required(),
      wallet_id: yup.number("'usuario_id_medico' must be numeric!").nullable(), // nullable por enquanto trocar depois...
    });

    try {
      await scheme.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }
    

    const { description, value, status, type, expire_at, wallet_id } = request.body;
    
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

    return response.status(201).json({
      goal,
    });
  }
}

module.exports = GoalUpdateController;
