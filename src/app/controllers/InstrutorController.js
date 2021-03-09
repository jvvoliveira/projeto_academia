const service = require('../services/InstrutorService');

const getAll = async (req, res) => {
    try{
        const instrutores = await service.getInstrutores();
        return res.json(instrutores);
    }catch(error){
        return res.status(500).json(error);
    }
}

module.exports = {
    getAll
}