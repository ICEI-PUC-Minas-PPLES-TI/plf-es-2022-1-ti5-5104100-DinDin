const AppError = require("../../../errors/AppError");
const Category = require("../../../models/Category");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { SortPaginate } = require("../../../helpers/SortPaginate");

class ListCategoriesUseCase {
  async list(query) {
    let whre = {};

    if (query.description) {
      whre.description = sequelize.where(
        sequelize.fn("LOWER", sequelize.col("description")),
        "LIKE",
        "%" + query.description.toLowerCase() + "%"
      );
    }
    if (query.type) {
      whre.type = query.type;
    }
    if (query.expire_at_start || query.expire_at_end) {
      const startDate = query.expire_at_start
        ? new Date(query.expire_at_start)
        : new Date(null); // * new Date(null) == 1970
      const endDate = query.expire_at_end
        ? new Date(query.expire_at_end)
        : new Date("2999/01/01");
      whre.expire_at = { [Op.between]: [startDate, endDate] };
    }
    if (query.wallet_id) {
      whre.wallet_id = query.wallet_id;
    }

    const attributes = Object.keys(Category.getAttributes);
    const categoriesQuantity = await Category.count();
    const sortPaginateOptions = SortPaginate(query, attributes, categoriesQuantity);
    if (query.created_at_start || query.created_at_end)
      whre.created_at = sortPaginateOptions.where.created_at;
    if (query.updated_at_start || query.updated_at_end)
      whre.updated_at = sortPaginateOptions.where.updated_at;
    if (query.deleted_at_start || query.deleted_at_end)
      whre.deleted_at = sortPaginateOptions.where.deleted_at;

    const categories = await Category.findAndCountAll({
      where: whre,
      limit: sortPaginateOptions.limit,
      offset: sortPaginateOptions.offset,
      order: sortPaginateOptions.order,
      paranoid: sortPaginateOptions.paranoid,
      // ! include: [wallet]
    }).catch((error) => {
      throw new AppError("Erro interno do servidor!", 500, error);
    });

    return {
      count: categories.rows.length,
      total: categories.count,
      pages: Math.ceil(categories.count / sortPaginateOptions.limit),
      categories: categories.rows,
    };
  }
}

module.exports = ListCategoriesUseCase;