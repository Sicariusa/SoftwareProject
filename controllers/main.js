const jwt = require('jsonwebtoken');
const { Customer, Admin } = require('../models/Prosche_Schema');
require('express-async-errors');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(401).json({ msg: "Email and password fields are required" });
    }

    let role = 'customer';
    let userID = null;

    const admin = await Admin.findOne({ email: email });
    if (admin && password == admin.password) {
        role = 'admin';
        userID = admin._id;
    } else {
        const customer = await Customer.findOne({ email: email });
        if (!customer || !(password == customer.password)) {
            res.status(401).json({ msg: "Invalid username or password" });
        }
        userID = customer._id;
    }
    const token = jwt.sign({ userID, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ token: token, role: role });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
        return res.status(400).json({ msg: 'Email already exists' });
    }

    try {
        const newCustomer = new Customer({
            name,
            email,
            password
        });

        await newCustomer.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = { login, register };