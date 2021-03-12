const database = require('../../config/database');

const getAlunos = () => {
    return database.query('select p.* from only Pessoa p');
}

const getAluno = (id) => {
    const params = { id };
    return database.one('select p.* from only Pessoa p where p.id = ${id}', params);
}

const createAluno = (nome, email) => {
    const params = {nome, email}
    return database.none('insert into Pessoa(nome, email) values(${nome}, ${email})', params);
}

module.exports = {
    getAlunos,
    getAluno,
    createAluno
};