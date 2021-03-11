const database = require('../../config/database');

const getTreinosExerciciosByTreinoId = async (treino_id) => {
    const params = {treino_id};
    return database.query(
        "select te.* from Treino_Exercicio te where te.treino_id = ${treino_id}",
        params
      );
}

module.exports = {
    getTreinosExerciciosByTreinoId
};