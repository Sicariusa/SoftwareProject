const express = require('express')
const router = express.Router()
const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product')
const authenticateToken = require('../middleware/authentication_Handler')
//priv8
router.get('/', getAllProducts)

//priv8
router.get('/:name', getSingleProduct)

// priv8
router.post('/',authenticateToken, createProduct)

// priv8
router.put('/:productId',authenticateToken, updateProduct)

router.delete('/:productId',authenticateToken, deleteProduct)

module.exports = router