const express = require ('express');
const router = express.Router();
// const userModel = require('../models/userModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const { register_controler, login_controller, logout_controler } = require('../controllers/userControlers')

// register route
router.post('/register',register_controler)

// Login route
router.post('/login',login_controller)

// logout route
router.get('/logout',logout_controler)

module.exports = router