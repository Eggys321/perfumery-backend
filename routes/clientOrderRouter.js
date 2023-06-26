const express = require('express');
const router = express.Router();
const ORDER = require('../models/clientOrderModel');
const auth = require('../middleware/auth');
const { create_controller, allOrders_controller } = require('../controllers/clientOrderControler');
// create order
router.post('/create',auth,create_controller)

router.get('/allOrders',auth,allOrders_controller)

module.exports = router