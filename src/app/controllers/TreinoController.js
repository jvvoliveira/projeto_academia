const treinoService = require("../services/TreinoService");
const treinoExercicioService = require("../services/TreinoExercicioService");
const exercicioService = require("../services/ExercicioService");
const alunoService = require("../services/AlunoService");
const instrutorService = require("../services/InstrutorService");
const db = require("../../config/database");

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
    const instrutor = await instrutorService.getInstrutorByRegistro(
      treino.instrutor_registro
    );

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
      exercicios: exerciciosFormat,
    };

    return res.json(response);
  } catch (error) {
    console.log(error);
    if (error.result && error.result.rowCount === 0) {
      return res.status(500).json({ error: "Treino ID não encontrado" });
    }
    return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  const { nome, aluno_id, instrutor_registro, treino_exercicios } = req.body;

  try {
    const existsAluno = await alunoService.getAluno(aluno_id);
  } catch (error) {
    if (error.result.rowCount === 0) {
      return res.status(401).json({ error: "Aluno não encontrado" });
    }
    return res.status(401).json({ error });
  }

  try {
    const existsInstrutor = await instrutorService.getInstrutorByRegistro(
      instrutor_registro
    );
  } catch (error) {
    if (error.result.rowCount === 0) {
      return res.status(401).json({ error: "Instrutor não encontrado" });
    }
    return res.status(401).json({ error });
  }

  const promise = await db.tx(async (t) => {
    const treino = await treinoService.createTreino(
      aluno_id,
      instrutor_registro,
      nome,
      t
    );

    const createTreinosExercicios = await treino_exercicios.map(
      async (treino_exercicio) => {
        const { exercicio_id, series, repeticoes, descanso } = treino_exercicio;
        await treinoExercicioService.createTreinoExercicio(
          exercicio_id,
          treino.id,
          series,
          repeticoes,
          descanso,
          t
        );
      }
    );
    await Promise.all(createTreinosExercicios);
  });

  return res.status(200).json({ message: "Sucesso" });
};

const update = async (req, res) => {
  const { id, nome, realizacoes, treino_exercicios } = req.body;

  try {
    await treinoService.getTreino(id);
  } catch (error) {
    if (error.result && error.result.rowCount === 0) {
      return res.status(401).json({ error: "Treino ID não encontrado" });
    }
    return res.status(500).json(error);
  }

  try{
    await db.tx(async t => {
      await treinoService.updateTreino(id, nome, realizacoes, t);
  
      if(treino_exercicios){
        const promisesUpdateTreinoExercicio = treino_exercicios.map(async treino_exercicio => {
          const { treino_exercicio_id , exercicio_id, series, repeticoes, descanso } = treino_exercicio;
          await treinoExercicioService.updateTreinoExercicio(treino_exercicio_id, exercicio_id, series, repeticoes, descanso, t)
        }) 
        await Promise.all(promisesUpdateTreinoExercicio);
      }
    })
  }catch(error){
    res.status(401).json(error);
  }

  return res.status(200).json({ message: "Treino atualizado com sucesso" });
};

const deleteTreino = async (req, res) => {
  const { id } = req.params;

  try {
    await treinoService.getTreino(id);
  } catch (error) {
    if (error.result && error.result.rowCount === 0) {
      return res.status(401).json({ error: "Treino ID não encontrado" });
    }
    return res.status(500).json(error);
  }

  await treinoService.deleteTreino(id);
  return res.status(200).json({message: "Treino deletado com sucesso"});
}

module.exports = {
  getAllByAluno,
  getOne,
  create,
  update,
  deleteTreino
};
