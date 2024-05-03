const express = require('express')
const router = express.Router()
const login = require('../controllers/main')

// can curd product

router.post('/',login)

module.exports = router