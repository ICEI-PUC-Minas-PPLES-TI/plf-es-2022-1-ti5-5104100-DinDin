const { Op } = require("sequelize");

function SortPaginate(query, attributes, dataCount) {
  let paranoid = true;
  let whre = {};
  const startDate = new Date(null); // * new Date(null) == 1970
  const endDate = new Date("2999/01/01");

  if (query.created_at_start || query.created_at_end) {
    const createdStartDate = query.created_at_start
      ? new Date(query.created_at_start)
      : startDate;
    const createdEndDate = query.created_at_end
      ? new Date(query.created_at_end)
      : endDate;
    whre.created_at = { [Op.between]: [createdStartDate, createdEndDate] };
  }
  if (query.updated_at_start || query.updated_at_end) {
    const updatedStartDate = query.updated_at_start
      ? new Date(query.updated_at_start)
      : startDate;
    const updatedEndDate = query.updated_at_end
      ? new Date(query.updated_at_end)
      : endDate;
    whre.updated_at = { [Op.between]: [updatedStartDate, updatedEndDate] };
  }
  if (query.deleted_at_start || query.deleted_at_end) {
    paranoid = false;
    const deletedStartDate = query.deleted_at_start
      ? new Date(query.deleted_at_start)
      : startDate;
    const deletedEndDate = query.deleted_at_end
      ? new Date(query.deleted_at_end)
      : endDate;
    whre.deleted_at = { [Op.between]: [deletedStartDate, deletedEndDate] };
  }

  const limit =
    query.limit && Number.parseInt(query.limit) < 50
      ? Number.parseInt(query.limit)
      : 50;

  const page = query.page ? Number.parseInt(query.page) : 1;
  const pages = Math.ceil(dataCount / limit);

  const offset = limit * (page - 1);

  const attribute =
    query.attribute && attributes && attributes.includes(query.attribute)
      ? query.attribute
      : "id";

  const order = query.order === "DESC" ? "DESC" : "ASC";

  return {
    where: whre,
    limit: limit,
    offset: offset,
    order: [[attribute, order]],
    pages: pages,
    paranoid: paranoid,
  };
}

module.exports = {
  SortPaginate,
};
