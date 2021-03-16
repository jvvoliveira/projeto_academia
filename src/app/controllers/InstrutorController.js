const service = require("../services/InstrutorService");

const getAll = async (req, res) => {
  try {
    const instrutores = await service.getInstrutores();
    return res.json(instrutores);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(401)
      .json({ error: "Obrigatória a passagem do ID de um Instrutor" });
  }

  try {
    const pessoa = await service.getInstrutor(id);
    return res.json(pessoa);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  const { email, nome, academia_id, registro } = req.body;

  if (!email || !nome || !academia_id || !registro) {
    return res
      .status(401)
      .json({ error: "Informe todos os campos necessários" });
  }

  try {
    await service.createInstrutor(nome, email, academia_id, registro);
    return res.json({message: "Instrutor criado com sucesso"});
  } catch (error) {
    if (error.constraint === "instrutor_registro_key") {
      return res.status(500).json({ error: "Email ou registro já cadastrado" });
    }
    return res.status(500).json(error);
  }
};

const updateInstrutor = async (req, res) => {
  const { id, nome, academia_id, registro } = req.body;

  if (!id || !nome || !academia_id || !registro) {
    return res
      .status(401)
      .json({ error: "Informe todos os campos necessários" });
  }

  const existsInstrutor = await service.getInstrutor(id);

  if (!existsInstrutor) {
    return res.status(401).json({ error: "Instrutor ID não encontrado" });
  }
  try {
    await service.updateInstrutor(id, nome, academia_id, registro);
    return res
      .status(200)
      .json({ message: "Instrutor atualizado com sucesso" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

const deleteInstrutor = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(401)
      .json({ error: "Obrigatória a passagem do ID de um instrutor" });
  }

  const existsInstrutor = await service.getInstrutor(id);

  if (!existsInstrutor) {
    return res.status(201).json({ error: "Instrutor ID não encontrado" });
  }

  try {
    await service.deleteInstrutor(id);
    return res.json({ message: "Instrutor deletado com sucesso" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  updateInstrutor,
  deleteInstrutor,
};
