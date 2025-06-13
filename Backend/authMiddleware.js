const express = require('express');               // Import Express framework
const router = express.Router();                  // Create a new router instance

const jwt = require("jsonwebtoken");              // Import the JSON Web Token library

// Middleware function to authenticate incoming requests using a JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];        // Get the Authorization header (e.g. "Bearer token")
  const token = authHeader && authHeader.split(' ')[1];   // Extract the token (split by space, take second part)

   // If there is no token, respond with 401 Unauthorized
  if (!token) return res.status(401).json({ message: 'Token required' });

   // Verify the token using the secret key
  jwt.verify(token, 'my_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;    // Attach decoded user data to the request object
    next();             // Call next middleware or route handler
  });
}

module.exports = authenticateToken;   // Export the middleware function so it can be used in routes