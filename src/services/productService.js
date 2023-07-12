const { models } = require('../libs/sequelize')

const find = () => {
  const products = models.Product.findAll()

  return products
}

const findOne = (id) => {
  const product = models.Product.findByPk(id)

  if(!product) throw new Error('No se encontro el producto')

  return product
}

module.exports = {
  find,
  findOne
}