const service = require("../services/AcademiaService");

const getAll = async (req, res) => {
    try {
      const academias = await service.getAcademias();
      return res.json(academias);
    } catch (error) {
      return res.status(500).json(error);
    }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(401)
      .json({ error: "Obrigatória a passagem do ID de uma academia" });
  }

  try {
    const academia = await service.getAcademia(id);
    return res.json(academia);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  const { nome } = req.body;

  if (!nome ) {
    return res
      .status(401)
      .json({ error: "Informe todos os campos necessários" });
  }

  try {
    await service.createAcademia(nome);
    return res.json({message: "Academia criada com sucesso"});
  } catch (error) {
    if (error.constraint === "academia_nome_key") {
      return res.status(401).json({ error: "Academia já cadastrada" });
    }
    return res.status(500).json(error);
  }
};

const updateAcademia = async (req, res) => {
  const { id, nome } = req.body;

  if (!id || !nome) {
    return res
      .status(401)
      .json({ error: "Informe todos os campos necessários" });
  }

  const existsAcademia = await service.getAcademia(id);

  if (!existsAcademia) {
    return res.status(401).json({ error: "Academia ID não encontrado" });
  }
  try{
      await service.updateAcademia(id, nome);
      return res.status(200).json({message: "Academia atualizada com sucesso"}); 
  }catch(error){
    if (error.constraint === "academia_nome_key") {
      return res.status(401).json({ error: "Academia já cadastrada" });
    }
    return res.status(500).json(error);
  }
};

const deleteAcademia = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(401)
      .json({ error: "Obrigatória a passagem do ID de uma academia" });
  }

  const existsAcademia = await service.getAcademia(id);

  if (!existsAcademia) {
    return res.status(201).json({ error: "Academia ID não encontrado" });
  }

  try {
    await service.deleteAcademia(id);
    return res.json({ message: "Academia deletada com sucesso" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  updateAcademia,
  deleteAcademia
};
