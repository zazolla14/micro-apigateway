const express = require('express')
const router = express.Router()
const ordersPaymentsHandler = require('./handler/orders-payments')

router.get('/', ordersPaymentsHandler.getOrders)

module.exports = router
