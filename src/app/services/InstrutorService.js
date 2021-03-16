const database = require("../../config/database");

const getInstrutores = () => {
  return database.query("select * from Instrutor");
};

const getInstrutorByRegistro = (registro) => {
  const params = { registro };
  return database.oneOrNone(
    "select * from Instrutor i where i.registro = ${registro}",
    params
  );
};

const getInstrutor = (id) => {
  const params = { id };
  return database.oneOrNone(
    "select * from Instrutor i where i.id = ${id}",
    params
  );
};

const createInstrutor = (nome, email, academia_id, registro) => {
  const params = { nome, email, academia_id, registro };
  return database.none(
    "insert into Instrutor(nome, email, academia_id, registro) values(${nome}, ${email}, ${academia_id}, ${registro})",
    params
  );
};

const updateInstrutor = (id, nome, academia_id, registro) => {
  const params = { id, nome, academia_id, registro };
  return database.none(
    "update Instrutor p set nome = ${nome}, academia_id = ${academia_id}, registro = ${registro} where p.id = ${id}",
    params
  );
};

const deleteInstrutor = (id) => {
  const params = { id };
  return database.none("delete from Instrutor i where i.id = ${id}", params);
};

module.exports = {
  getInstrutores,
  getInstrutorByRegistro,
  getInstrutor,
  createInstrutor,
  updateInstrutor,
  deleteInstrutor
};
