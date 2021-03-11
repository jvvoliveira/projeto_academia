const treinoService = require("../services/TreinoService");
const treinoExercicioService = require("../services/TreinoExercicioService");
const exercicioService = require("../services/ExercicioService");
const alunoService = require("../services/AlunoService");
const instrutorService = require("../services/InstrutorService");

const getAllByAluno = async (req, res) => {
  const { aluno_id } = req.params;

  try {
    const treinos = await treinoService.getTreinosByAluno(aluno_id);
    return res.json(treinos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const treino = await treinoService.getTreino(id);

    const aluno = await alunoService.getAluno(treino.aluno_id);
    const instrutor = await instrutorService.getInstrutorByRegistro(treino.instrutor_registro);

    const treinos_exercicios = await treinoExercicioService.getTreinosExerciciosByTreinoId(
      id
    );

    const promiseExercicios = treinos_exercicios.map((treino_exercicio) =>
      exercicioService.getExerciciosByTreinoExercicio(treino_exercicio.id)
    );
    const exercicios = await Promise.all(promiseExercicios);

    const exerciciosFormat = exercicios.map((exercicio, index) => ({
      id: treinos_exercicios[index].id,
      nome: exercicio.nome,
      repeticoes: treinos_exercicios[index].repeticoes,
      series: treinos_exercicios[index].series,
      descanso: treinos_exercicios[index].descanso,
    }));

    delete treino.aluno_id;
    delete treino.instrutor_registro;

    const response = {
        ...treino,
        aluno,
        instrutor,
        exercicios: exerciciosFormat
    }

    return res.json(response);
  } catch (error) {
    console.log(error);
    if (error.result && error.result.rowCount === 0) {
      return res.status(500).json({ error: "Treino ID não encontrado" });
    }
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllByAluno,
  getOne,
};
