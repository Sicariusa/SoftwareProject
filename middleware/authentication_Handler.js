const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({msg: "Bearer Token is required in the request"})
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {userID, role} = decoded
        req.user = {userID, role}
        next()
    } catch (error) {
        res.status(401).json({msg: "Invalid Token"})
    }
};

module.exports = authenticateToken;
