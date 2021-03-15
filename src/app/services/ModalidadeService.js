const database = require("../../config/database");

const getModalidade = async (id) => {
  const params = { id };
  return database.oneOrNone(
    "select m.* from Modalidade m where m.id = ${id}",
    params
  );
};

module.exports = {
  getModalidade
};
