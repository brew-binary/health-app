class DBHelper {
  static async getOptions(
    whereQuery,
    selectArray,
    sortBy,
    skip,
    limit,
    transaction,
    group,
  ) {
    var options = {};
    if (whereQuery) options['where'] = whereQuery;
    if (selectArray) options['attributes'] = selectArray;
    if (sortBy) options['order'] = sortBy;
    if (skip) options['offset'] = skip;
    if (limit) options['limit'] = limit;
    if (transaction) options['transaction'] = transaction;
    if (group) options['group'] = group;
    return options;
  }
}

module.exports = DBHelper;
