const jwt = require('jsonwebtoken')
const { Customer, Admin } = require('../models/Prosche_Schema')
require('express-async-errors');

const login = async (req,res) => {
    const {email, password} = req.body

    if(!email || !password){
        res.status(401).json({msg: "email and password fields are required"})
    }

    let role = 'customer'
    let userID = null

    const admin = await Admin.findOne({email:email})
    if(admin && password == admin.password){
        role = 'admin'
        userID = admin._id
    }else{
        const customer = await Customer.findOne({email: email})
        if(!customer || !(password == customer.password)){
            res.status(401).json({msg: "Invalid username or password"})
        }
        userID = customer._id
    }
    const token = jwt.sign({userID, role}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(200).json({token: token, role:role})
}

module.exports = login