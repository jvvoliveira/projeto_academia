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

const createTreino = async (aluno_id, instrutor_registro, nome, transaction) => {
  const params = { aluno_id, instrutor_registro, nome };
  return transaction.one(
    "insert into Treino(aluno_id, instrutor_registro, nome) values(${aluno_id}, ${instrutor_registro}, ${nome}) RETURNING id",
    params
  );
};

const updateTreino = async (id, nome, realizacoes, transaction) => {
  const params = {id, nome, realizacoes};
  return transaction.none("UPDATE Treino SET nome = ${nome}, realizacoes = ${realizacoes} WHERE id = ${id}", params);
}

module.exports = {
  getTreinosByAluno,
  getTreino,
  createTreino,
  updateTreino
};
