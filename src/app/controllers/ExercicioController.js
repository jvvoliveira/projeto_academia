const exercicioService = require("../services/ExercicioService");
const modalidadeService = require("../services/ModalidadeService");

const getAll = async (req, res) => {
  const { modalidade } = req.query;
  try {
    let exercicios;
    if (modalidade) {
      exercicios = await exercicioService.getExerciciosByModalidade(modalidade);
    } else {
      exercicios = await exercicioService.getExercicios();
    }
    return res.json(exercicios);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(401)
      .json({ error: "Obrigatória a passagem do ID de um exercicio" });
  }

  try {
    const exercicio = await exercicioService.getExercicio(id);
    if (!exercicio) {
      return res.status(401).json({ error: "Exercício ID não encontrado" });
    }
    const modalidade = await modalidadeService.getModalidade(
      exercicio.modalidade_id
    );

    delete exercicio.modalidade_id;
    const responseFormat = { ...exercicio, modalidade };

    return res.json(responseFormat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  const { nome, modalidade_id } = req.body;

  if (!modalidade_id || !nome) {
    return res
      .status(401)
      .json({ error: "Informe todos os campos necessários" });
  }

  try {
    await exercicioService.createExercicio(nome, modalidade_id);
    return res.json("Exercício criado com sucesso");
  } catch (error) {
    if (error.constraint === "exercicio_nome_key") {
      return res.status(500).json({ error: "Exercício já cadastrado" });
    }
    return res.status(500).json(error);
  }
};

const update = async (req, res) => {
  const { id, nome, modalidade_id } = req.body;

  if (!modalidade_id || !nome || !id) {
    return res
      .status(401)
      .json({ error: "Informe todos os campos necessários" });
  }

  const existsExercicio = await exercicioService.getExercicio(id);
  if (!existsExercicio) {
    return res.status(401).json({ error: "Exercício ID não encontrado" });
  }

  await exercicioService.updateExercicio(id, nome, modalidade_id);
  return res.json("Exercício atualizado com sucesso");
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
};
