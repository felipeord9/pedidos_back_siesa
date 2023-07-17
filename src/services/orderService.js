const { models } = require("../libs/sequelize");

const find = () => {
  const orders = models.Order.findAll({
    include: [
      "client",
      "seller",
      "branch",
      "items"
    ],
  });

  return orders
};

const finOne = (id) => {
  const order = models.Order.findByPk(id,{
    include: [
      "client",
      "seller",
      "branch",
      {
        association: "items"
      },
    ],
  })

  if(!order) throw Error('No se encontró la orden')

  return order
}

const create = (body) => {
  const newOrder = models.Order.create(body)
  return newOrder
}

const addItem = (body) => {
  const newItem = models.OrderProduct.create(body)

  return newItem
}

module.exports = {
  find,
  finOne,
  create,
  addItem
}