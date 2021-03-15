const database = require('../../config/database');

const getInstrutores = () => {
    return database.query('select * from Instrutor');
}

const getInstrutorByRegistro = (registro) => {
    const params = {registro};
    return database.oneOrNone('select * from Instrutor i where i.registro = ${registro}', params);
}

module.exports = {
    getInstrutores,
    getInstrutorByRegistro
};