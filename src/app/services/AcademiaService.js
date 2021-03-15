const database = require("../../config/database");

const getAcademias = () => {
  return database.query("select a.* from Academia a");
};

module.exports = {
  getAcademias
};
