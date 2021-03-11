const database = require("../../config/database");

const getTreinosByAluno = async (id) => {
  const params = { id };
  const response = await database.query(
    "select t.id, t.nome, t.realizacoes from Treino t, Pessoa p where t.aluno_id = p.id and p.id = ${id}",
    params
  );
  return response;
};

const getTreino = async (id) => {
  const params = { id };
  const treino = await database.one(
    "select t.* from Treino t where t.id = ${id}",
    params
  );
  return treino;
};

module.exports = {
  getTreinosByAluno,
  getTreino,
};
