function SortPaginate(query, attributes, dataCount) {
  const limit =
    query.limit && Number.parseInt(query.limit) < 50
      ? Number.parseInt(query.limit)
      : 50;

  const page = query.pagina ? Number.parseInt(query.pagina) : 1;
  const pages = Math.ceil(dataCount / limit);

  const offset = limit * (page - 1);

  const attribute =
    query.attribute && attributes && attributes.includes(query.attribute)
      ? query.attribute
      : "id";

  const order = query.order === "DESC" ? "DESC" : "ASC";

  return {
    limit: limit,
    offset: offset,
    order: [[attribute, order]],
    pages: pages
  };
}

module.exports = {
  SortPaginate
};

