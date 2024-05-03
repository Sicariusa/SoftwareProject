const express = require('express')
const router = express.Router()
const {login} = require('../controllers/admin')

// can curd product

router.post('/login',login)

module.exports = router