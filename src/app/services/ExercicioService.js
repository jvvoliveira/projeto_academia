const database = require('../../config/database');

const format = (exercicio) => ({
  id: exercicio.id,
  nome: exercicio.nome,
  modalidade: {
    id: exercicio.modalidade_id,
    nome: exercicio.modalidade_nome,
  },
});

const getExercicios = async () => {
  const response = await database.query(
    "select e.*, m.nome as modalidade_nome from Exercicio e, Modalidade m where e.modalidade_id = m.id"
  );

  const exerciciosList = response.map((exercicio) => format(exercicio));

  return exerciciosList;
};

const getExerciciosByTreinoExercicio = async (treino_exercicio_id) => {
  const params = {treino_exercicio_id};
    return database.one(
      "select e.id, e.nome from Exercicio e, Treino_Exercicio te where te.id = ${treino_exercicio_id} and e.id = te.exercicio_id",
      params
    )
}

const getExerciciosByModalidade = async (modalidade) => {
  const params = { modalidade };
  const response = await database.query(
    "select e.*, m.nome as modalidade_nome from Exercicio e, Modalidade m where e.modalidade_id = m.id and m.nome = ${modalidade}",
    params
  );

  const exerciciosList = response.map((exercicio) => format(exercicio));

  return exerciciosList;
};

const getExercicio = async (id) => {
  const params = { id };
  const response = await database.one(
    "select e.*, m.nome as modalidade_nome from Exercicio e, Modalidade m where e.modalidade_id = m.id and e.id = ${id}",
    params
  );
  return format(response);
};

const createExercicio = (nome, modalidade_id) => {
  const params = { nome, modalidade_id };
  return database.none(
    "insert into Exercicio(nome, modalidade_id) values(${nome}, ${modalidade_id})",
    params
  );
};

module.exports = {
  getExercicios,
  getExerciciosByModalidade,
  getExercicio,
  createExercicio,
  getExerciciosByTreinoExercicio
};
