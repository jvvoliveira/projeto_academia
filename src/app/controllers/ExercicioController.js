const service = require('../services/ExercicioService');

const getAll = async (req, res) => {
    const { modalidade } = req.query;
    try{
        let exercicios;
        if(modalidade){
            exercicios = await service.getExerciciosByModalidade(modalidade);
        }else{
            exercicios = await service.getExercicios();
        }
        return res.json(exercicios);
    }catch(error){
        return res.status(500).json(error);
    }
}

const getOne = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return res.status(401).json({error: "Obrigatória a passagem do ID de um exercicio"});
    }

    try{
        const exercicio = await service.getExercicio(id);
        return res.json(exercicio);
    }catch(error){
        return res.status(500).json(error);
    }
}

const create = async (req, res) => {
    const { nome, modalidade_id } = req.body;

    if(!modalidade_id || !nome){
        return res.status(401).json({error: "Informe todos os campos necessários"});
    }

    try{
        await service.createExercicio(nome, modalidade_id);
        return res.json('Exercício criado com sucesso');
    }catch(error){
        if(error.constraint === 'exercicio_nome_key' ){
            return res.status(500).json({error: "Exercício já cadastrado"});
        }
        return res.status(500).json(error);
    }
}

module.exports = {
    getAll,
    getOne,
    create
}