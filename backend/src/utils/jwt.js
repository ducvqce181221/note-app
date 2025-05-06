

const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
    try {
        return token = jwt.sign(payload, process.env.JWT_SECRET);
    } catch (error) {
        console.log('JWT SIGN ERROR:', error.message);
        return null;
    }
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        console.log('>>> JWT verification error:', error.message);
        return res.status(403).json({ error: true, message: 'Invalid token.' });
    }

}

module.exports = { createJWT, verifyToken }
