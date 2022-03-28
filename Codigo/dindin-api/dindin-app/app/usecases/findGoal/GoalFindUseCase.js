const AppError = require("../../errors/AppError");
const Goal = require("../../models/Goal");

class GoalFindUseCase {

  async find(id) {
    const goal = await Goal.findOne({
      where: {
        id: id
      }
    }).catch(error => {
      throw new AppError(error.message, 500, error);
    });
    if(goal)
      return goal;
    else
      throw new AppError('Goal not found!', 404)
  }

}

module.exports = GoalFindUseCase;
