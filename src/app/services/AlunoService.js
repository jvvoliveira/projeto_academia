const database = require('../../config/database');

const getAlunos = () => {
    return database.query('select p.* from only Pessoa p');
}

const getAluno = (id) => {
    const params = { id };
    return database.one('select p.* from only Pessoa p where p.id = ${id}', params);
}

const createAluno = (nome, email, academia_id) => {
    const params = {nome, email, academia_id}
    return database.none('insert into Pessoa(nome, email, academia_id) values(${nome}, ${email}, ${academia_id})', params);
}

module.exports = {
    getAlunos,
    getAluno,
    createAluno
};