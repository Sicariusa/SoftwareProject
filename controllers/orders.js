const { default: mongoose } = require('mongoose');
const { Customer, Product } = require('../models/Prosche_Schema');

const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const { userID, role } = req.user;

        // Check if the user is a customer
        if (role !== 'customer') {
            return res.status(403).json({ msg: 'Only customers can add products to the shopping cart' });
        }

        const customer = await Customer.findOne({_id:userID});

        // Check if the product exists
        const product = await Product.findOne({_id: productId});
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Update the customer document to add the product to the shopping cart
        await Customer.findByIdAndUpdate(userID, { $addToSet: { shoppingCart: { productId: product._id } } });
        res.status(200).json({ 
            msg: 'Product added to the shopping cart successfully',
            NumberOfProducts: customer.shoppingCart.length,
            cartDetail: customer.shoppingCart.map(item => ({
                productId: item.productId,
            })),
        });        
            } catch (error) {
        console.error('Error adding product to the shopping cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const { userID, role } = req.user;

        // Check if the user is a customer
        if (role !== 'customer') {
            return res.status(403).json({ msg: 'Only customers can remove products from the shopping cart' });
        }
        let user = await Customer.findOne({_id:userID})
        if(user.shoppingCart.length === 0){
            return res.status(405).json({msg: `your cart is empty`, cartDetail: `${user.shoppingCart}`})
        }

        await Customer.findOneAndUpdate({ _id: userID },{ $pull: { shoppingCart: { productId: productId } } });
        res.status(200).json({ msg: 'Product removed from the shopping cart successfully' });
    } catch (error) {
        console.error('Error removing product from the shopping cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addToCart,
    removeFromCart
};
