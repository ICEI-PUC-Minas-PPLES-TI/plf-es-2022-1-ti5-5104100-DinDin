const sequelize = require("sequelize");
const { Op } = require('sequelize');

const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");
const { SortPaginate } = require("../../../helpers/SortPaginate");

class ListGoalUseCase {
  async list(query) {
    let whre = {};

    if (query.description) {
      whre.description = sequelize.where(sequelize.fn('LOWER', sequelize.col('description')), 'LIKE', '%' + query.description.toLowerCase() + '%')
    }
    if (query.value) {
      whre.value = query.value;
    }
    if (query.status) {
      whre.status = query.status;
    }
    if (query.type) {
      whre.type = query.type;
    }
    if (query.expire_at_start || query.expire_at_end) {
      const startDate = query.expire_at_start ? new Date(query.expire_at_start) : new Date(null); // * new Date(null) == 1970
      const endDate = query.expire_at_end ? new Date(query.expire_at_end) : new Date("2999/01/01");
      whre.expire_at = {[Op.between] : [startDate , endDate ]};
    }
    if (query.wallet_id) {
      whre.wallet_id = query.wallet_id;
    }

    const attributes = Object.keys(Goal.getAttributes);
    const goalsQuantity = await Goal.count();
    const sortPaginateOptions = SortPaginate(query, attributes, goalsQuantity);

    const goals = await Goal.findAndCountAll({
      where: whre,
      limit: sortPaginateOptions.limit,
      offset: sortPaginateOptions.offset,
      order: sortPaginateOptions.order
      // ! include: [wallet]
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
