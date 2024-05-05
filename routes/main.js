// main.js routes
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/main');

// Define the routes for login and register
router.post('/', login);
router.post('/register', register);

module.exports = router;