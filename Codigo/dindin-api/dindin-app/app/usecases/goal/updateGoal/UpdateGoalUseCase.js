const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");

class UpdateGoalUseCase {
  async update( id, description, value, status, type, expire_at, wallet_id) {

    const goal = await Goal.update({
      description,
      value,
      status,
      type,
      expire_at,
      wallet_id
    },
    {
      where: { id: id }
    }).catch((error) => {
      //console.log(error);
      throw new AppError(error.message, 500, error);
    });
    return  await Goal.findOne({where:{id: id}}) ;
  }
}

module.exports = UpdateGoalUseCase;
