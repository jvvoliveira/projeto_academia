const database = require("../../config/database");

const getAcademias = () => {
  return database.query("select a.* from Academia a");
};

const getAcademia = (id) => {
  const params = { id };
  return database.oneOrNone("select * from Academia a where a.id = ${id}", params);
}

const createAcademia = (nome) => {
  const params = {nome};
  return database.none("insert into Academia(nome) values(${nome})", params);
}

const updateAcademia = (id, nome) => {
  const params = {id, nome};
  return database.none("update Academia a set nome = ${nome} where a.id = ${id}", params);
}

const deleteAcademia = (id) => {
  const params = { id };
  return database.none("delete from Academia a where a.id = ${id}", params);
};

module.exports = {
  getAcademias,
  getAcademia,
  createAcademia,
  updateAcademia,
  deleteAcademia
};
