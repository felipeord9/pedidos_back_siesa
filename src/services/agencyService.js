const { models } = require("../libs/sqlServer");

const find = () => {
  const agencies = models.Agencia.findAll({
    limit: 100,
    attributes: ['id', 'descripcion'],
    include: ['contacto']
  });
  return agencies;
};

module.exports = {
  find
};