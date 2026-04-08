const express = require('express')
const ListaPrecioController = require('../../controllers/listaPrecioController')

const router = express.Router()

router
  .get('/', ListaPrecioController.findAllListas)
  .get('/co', ListaPrecioController.findAllListasCo)
  module.exports = router