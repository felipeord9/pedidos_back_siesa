const OrderService = require('../services/orderService')

const findAllOrders = async (req, res, next) => {
  try {
    const data = await OrderService.find()

    res.status(200).json({
      message: 'OK',
      data 
    })
  } catch (error) {
    next(error)
  }
}

const findOneOrder = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await OrderService.finOne(id)

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const createOrder = async (req, res, next) => {
  try {
    const { body } = req
    const data = await OrderService.create(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    next(error)
  }
}

const addItemOrder = async (req, res, next) => {
  try {
    const { body } = req
    const data = await OrderService.addItem(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllOrders,
  findOneOrder,
  createOrder,
  addItemOrder
}