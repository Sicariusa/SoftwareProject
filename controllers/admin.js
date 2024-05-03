const { Admin } = require('../models/Prosche_Schema')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    const { email, password } = req.body
    req.headers.Authorization

    try {
        const admin = await Admin.findOne({ email:email, password:password })

        if (!admin) {
            return res.status(401).json({ error: 'Authentication failed: Admin not found' })
        }

        const token = jwt.sign({
            id: admin._id,
            name: admin.name,
            role: 'admin'
        }, 'fallback_secret', { expiresIn: '24h' })

        res.status(200).json({ token })
    } catch (error) {
        console.error('Error logging in admin:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {login}