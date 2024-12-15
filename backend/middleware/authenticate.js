const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as needed



const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
        // console.log('Authorization Header:', authHeader); // Debugging

    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Authorization header missing or malformed');
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
      }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
    if (!token) {
        console.log('Token is missing');
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.MONGO_URI); // Replace with your JWT secret
        //console.log('Decoded Token:', decoded); // Debugging

        req.user = decoded; // Attach the user payload to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
