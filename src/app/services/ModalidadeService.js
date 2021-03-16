const database = require("../../config/database");

const getModalidade = async (id) => {
  const params = { id };
  return database.oneOrNone(
    "select m.* from Modalidade m where m.id = ${id}",
    params
  );
};

const getAll = async () => {
  return database.query("select * from Modalidade");
};

const create = async (nome) => {
  const params = { nome };
  return database.none(
    "insert into Modalidade(nome) values(${nome})",
    params
  );
};

module.exports = {
  getModalidade,
  getAll,
  create
};
