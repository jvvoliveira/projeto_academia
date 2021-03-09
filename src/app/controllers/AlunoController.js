const service = require('../services/AlunoService');

const getAll = async (req, res) => {
    try{
        const pessoas = await service.getAlunos();
        return res.json(pessoas);
    }catch(error){
        return res.status(500).json(error);
    }
}

const getOne = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return res.status(401).json({error: "Obrigatória a passagem do ID de uma aluno"});
    }

    try{
        const pessoa = await service.getAluno(id);
        return res.json(pessoa);
    }catch(error){
        return res.status(500).json(error);
    }
}

const create = async (req, res) => {
    const { email, nome } = req.body;

    if(!email || !nome){
        return res.status(401).json({error: "Informe todos os campos necessários"});
    }

    try{
        await service.createAluno(nome, email);
        return res.json('Aluno criado com sucesso');
    }catch(error){
        if(error.constraint === 'pessoa_email_key' ){
            return res.status(500).json({error: "Email já cadastrado"});
        }
        return res.status(500).json(error);
    }
}

module.exports = {
    getAll,
    getOne,
    create
}