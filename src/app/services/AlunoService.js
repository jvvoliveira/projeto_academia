const database = require("../../config/database");

const getAlunos = () => {
  return database.query("select p.* from only Pessoa p");
};

const getAlunosByAcademia = (academia) => {
  const params = { academia };
  return database.query(
    "select p.* from only Pessoa p where p.academia_id = ${academia}",
    params
  );
};

const getAluno = (id) => {
  const params = { id };
  return database.oneOrNone(
    "select p.* from only Pessoa p where p.id = ${id}",
    params
  );
};

const createAluno = (nome, email, academia_id) => {
  const params = { nome, email, academia_id };
  return database.none(
    "insert into Pessoa(nome, email, academia_id) values(${nome}, ${email}, ${academia_id})",
    params
  );
};

const updateAluno = (id, nome, academia_id) => {
  const params = { id, nome, academia_id };
  return database.none(
    "update only Pessoa p set nome = ${nome}, academia_id = ${academia_id} where p.id = ${id}",
    params
  );
};

const deleteAluno = (id) => {
  const params = { id };
  return database.none("delete from only Pessoa p where p.id = ${id}", params);
};

module.exports = {
  getAlunos,
  getAluno,
  createAluno,
  deleteAluno,
  getAlunosByAcademia,
  updateAluno
};
