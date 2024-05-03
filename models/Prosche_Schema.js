const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number
});

const Product = mongoose.model('product', ProductSchema);

// Inside the Customer schema or document
const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    shoppingCart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            quantity: Number,
            price: Number
        }
    ]
});


// CustomerSchema.methods.isValidPassword = async function(password) {
//     try {
//         return await password === this.password;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

const Customer = mongoose.model('customer', CustomerSchema);

const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

AdminSchema.methods.isValidPassword = async function(password) {
    try {
        return await password === this.password;
    } catch (error) {
        throw new Error(error);
    }
};

const Admin = mongoose.model('admin', AdminSchema);

module.exports = { Product, Customer, Admin };
