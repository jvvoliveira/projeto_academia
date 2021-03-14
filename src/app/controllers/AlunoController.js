const service = require("../services/AlunoService");

const getAll = async (req, res) => {
  const { academia } = req.query;

  if (academia) {
    try {
      const pessoas = await service.getAlunosByAcademia(academia);
      return res.json(pessoas);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    try {
      const pessoas = await service.getAlunos();
      return res.json(pessoas);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(401)
      .json({ error: "Obrigatória a passagem do ID de uma aluno" });
  }

  try {
    const pessoa = await service.getAluno(id);
    return res.json(pessoa);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  const { email, nome, academia_id } = req.body;

  if (!email || !nome || !academia_id) {
    return res
      .status(401)
      .json({ error: "Informe todos os campos necessários" });
  }

  try {
    await service.createAluno(nome, email, academia_id);
    return res.json("Aluno criado com sucesso");
  } catch (error) {
    if (error.constraint === "pessoa_email_key") {
      return res.status(500).json({ error: "Email já cadastrado" });
    }
    return res.status(500).json(error);
  }
};

const updateAluno = async (req, res) => {
  const { id, nome, academia_id } = req.body;

  const existsAluno = await service.getAluno(id);

  if (!existsAluno) {
    return res.status(401).json({ error: "Aluno ID não encontrado" });
  }
  try{
      await service.updateAluno(id, nome, academia_id);
      return res.status(200).json({message: "Aluno atualizado com sucesso"}); 
  }catch(error){
    return res.status(401).json(error);
  }
};

const deleteAluno = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(401)
      .json({ error: "Obrigatória a passagem do ID de uma aluno" });
  }

  const existsAluno = await service.getAluno(id);

  if (!existsAluno) {
    return res.status(201).json({ error: "Aluno ID não encontrado" });
  }

  try {
    await service.deleteAluno(id);
    return res.json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteAluno,
  updateAluno
};
