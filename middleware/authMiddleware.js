const jwt = require('jsonwebtoken');
const tokenSecrets = new Map();

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(403).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Access denied. Invalid token format.' });
    }

    try {
        const decoded = jwt.decode(token);
        const userId = decoded.id;

        const userSecret = tokenSecrets.get(userId);
        if (!userSecret) {
            return res.status(401).json({ error: 'Invalid token: Secret not found.' });
        }

        jwt.verify(token, userSecret);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
