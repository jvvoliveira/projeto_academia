const database = require("../../config/database");

const getTreinosExerciciosByTreinoId = async (treino_id) => {
  const params = { treino_id };
  return database.query(
    "select te.* from Treino_Exercicio te where te.treino_id = ${treino_id}",
    params
  );
};

const createTreinoExercicio = (
  exercicio_id,
  treino_id,
  series,
  repeticoes,
  descanso,
  transaction
) => {
  const params = { exercicio_id, treino_id, series, repeticoes, descanso };
  return transaction.none(
    "insert into Treino_Exercicio(exercicio_id, treino_id, series, repeticoes, descanso) values(${exercicio_id}, ${treino_id}, ${series}, ${repeticoes}, ${descanso})",
    params
  );
};

const updateTreinoExercicio = (
  treino_exercicio_id,
  exercicio_id,
  series,
  repeticoes,
  descanso,
  transaction
) => {
  const params = {
    treino_exercicio_id,
    exercicio_id,
    series,
    repeticoes,
    descanso,
  };
  return transaction.none(
    "update Treino_Exercicio set exercicio_id = ${exercicio_id}, series = ${series}, repeticoes = ${repeticoes}, descanso = ${descanso} where id = ${treino_exercicio_id}",
    params
  );
};

module.exports = {
  getTreinosExerciciosByTreinoId,
  createTreinoExercicio,
  updateTreinoExercicio
};
