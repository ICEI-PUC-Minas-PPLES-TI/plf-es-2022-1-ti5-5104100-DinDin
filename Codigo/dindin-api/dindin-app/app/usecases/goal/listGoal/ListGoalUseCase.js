const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");
const { Op } = require("sequelize");

class ListGoalUseCase {
  async list(query) {
    let whre = {};

    if (query.description) {
      whre.description = { [Op.like]: `%${query.description}%` };
    }
    if (query.status) {
      whre.status = query.status;
    }
    if (query.type) {
      whre.type = query.type;
    }

    const perPage = query.limit ? +query.limit : 10;
    const offset = query.page ? (query.page - 1) * perPage : 0;

    const goals = await Goal.findAndCountAll({
      where: whre,
      limit: perPage,
      offset: offset,
      //include: [wallet]
    }).catch((error) => {
      throw new AppError("Erro interno do servidor!", 500, error);
    });

    return {
      count: goals.rows.length,
      total: goals.count,
      pages: Math.ceil(goals.count / perPage),
      goals: goals.rows,
    };
  }
}

module.exports = ListGoalUseCase;
