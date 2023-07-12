const { models } = require('../libs/sequelize')

const find = () => {
  const sellers = models.Seller.findAll()
  return sellers
}

const findOne = (id) => {
  const seller = models.Seller.findByPk(id)

  if(!seller) throw Error("No se encontro el vendedor")

  return seller
}

module.exports = {
  find,
  findOne
}