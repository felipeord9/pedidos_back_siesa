const express = require('express')
const mailRoutes = require('./mailRoutes')
const ProductRoutes = require('./productRoutes')
const AgencyRoutes = require('./agencyRoutes')
const ClientRoutes = require('./clientRoutes')
const SellerRoutes = require('./sellerRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/mail', mailRoutes)
    router.use('/products', ProductRoutes)
    router.use('/agencies', AgencyRoutes)
    router.use('/clients', ClientRoutes)
    router.use('/sellers', SellerRoutes)
}

module.exports = routerApi