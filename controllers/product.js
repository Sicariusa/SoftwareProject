const { Product } = require('../models/Prosche_Schema')


const getAllProducts = async(req, res) => { // get all products
    try {
        const products = await Product.find({})
        res.status(200).json({products})
    } catch (error) {
        res.status(500).json({msg: 'something went wrong when trying to get the products'})
    }
}

const getSingleProduct = async(req,res)=>{ // get a single product
    try {
        const {name: productname} = req.params
        const product = await Product.findOne({name: productname})
        if(!product){
            return res.status(404).json({msg: 'product not found'})
        }
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}


const createProduct = async (req, res) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({msg: 'Unauthorized action'})
    }
    try {
        const { name, description, price, stock } = req.body

        if (!name || !description || !price || !stock) {
            return res.status(400).json({ error: 'Name, description, price, and stock are required' })
        }
        const newProduct = await Product.create(req.body)
        res.status(201).json({ message: 'Product added successfully', product: newProduct })
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

const updateProduct = async (req, res) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({msg: 'Unauthorized action'})
    }
    try {
        const productId = req.params.productId;
        let product = await Product.findByIdAndUpdate({_id: productId}, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        res.json({ message: 'Product edited successfully', product })
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}


const deleteProduct = async (req, res) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({msg: 'Unauthorized action'})
    }
    try {
        const productId = req.params.productId

        const product = await Product.findByIdAndDelete({_id: productId})
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}