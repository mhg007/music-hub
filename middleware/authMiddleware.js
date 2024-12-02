const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_here';

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Add user info to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
