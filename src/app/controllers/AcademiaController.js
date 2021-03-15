const service = require("../services/AcademiaService");

const getAll = async (req, res) => {
    try {
      const academias = await service.getAcademias();
      return res.json(academias);
    } catch (error) {
      return res.status(500).json(error);
    }
};

module.exports = {
  getAll
};
