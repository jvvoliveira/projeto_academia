const service = require("../services/ModalidadeService");

const getAll = async (req, res) => {
  try {
    const modalidades = await service.getAll();
    return res.json(modalidades);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res
      .status(401)
      .json({ error: "Informe todos os campos necessários" });
  }

  try {
    await service.create(nome);
    return res.json({ message: "Modalidade criada com sucesso" });
  } catch (error) {
    if (error.constraint === "modalidade_nome_key") {
      return res.status(401).json({ error: "Modalidade já cadastrada" });
    }
    return res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  create,
};
