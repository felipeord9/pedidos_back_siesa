const { Op } = require("sequelize");
const { models } = require("../libs/sqlServer");

const find = () => {
  const lista = models.ListaPrecio.findAll({
    limit:1000,
    where: {
      estado: {
        [Op.not]: 0
      },
    },
    include: ['listaCo']
  });

  return lista;
};

const findCo = () => {
  const lista = models.ListaPrecioCo.findAll({
    limit:10,
    include: ['lista']
  });

  return lista;
};

module.exports = {
  find,
  findCo,
};