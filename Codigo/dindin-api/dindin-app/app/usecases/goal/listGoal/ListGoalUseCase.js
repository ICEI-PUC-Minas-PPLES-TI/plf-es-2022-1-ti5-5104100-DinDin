const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");
const { Op } = require("sequelize");
const { SortPaginate } = require("../../../helpers/SortPaginate");

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

    const attributes = Object.keys(Goal.getAttributes);
    const goalsQuantity = await Goal.count();
    const sortPaginateOptions = SortPaginate(query, attributes, goalsQuantity);

    const goals = await Goal.findAndCountAll({
      where: whre,
      limit: sortPaginateOptions.limit,
      offset: sortPaginateOptions.offset,
      order: sortPaginateOptions.order
      //include: [wallet]
    }).catch((error) => {
      throw new AppError("Erro interno do servidor!", 500, error);
    });

    return {
      count: goals.rows.length,
      total: goals.count,
      pages: Math.ceil(goals.count / sortPaginateOptions.limit),
      goals: goals.rows,
    };
  }
}

module.exports = ListGoalUseCase;
