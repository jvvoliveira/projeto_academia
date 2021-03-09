const database = require('../../config/database');

const getInstrutores = () => {
    return database.query('select * from Instrutor');
}

module.exports = {
    getInstrutores
};