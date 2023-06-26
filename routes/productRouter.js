const express = require('express');
const router = express.Router();
const PERFUMERYS = require('../models/perfumeryModel');
const { createPerf_controller } = require('../controllers/productControler');

// create product   C
router.post('/create',createPerf_controller)

module.exports = router