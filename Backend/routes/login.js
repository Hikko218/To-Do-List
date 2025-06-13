const express = require('express');       // Import Express framework
const router = express.Router();          // Create a new router instance
const bcrypt = require('bcrypt');         // Import bcrypt for password hashing comparison
const jwt = require('jsonwebtoken');      // Import JSON Web Token for authentication

// Example user storage – in real applications, use a proper database
const users = require('./data/users');

// Secret key for signing JWTs – in real projects, store this in a .env file
const JWT_SECRET = "your_secret_key"; 

// Route for handling login requests
router.post("/", async (req, res) => {
  const { username, password } = req.body;        // Extract submitted username and password

   // Look up user by username
  const user = users.find(u => u.username === username);
  if (!user) {
    // If user is not found, respond with unauthorized
    return res.status(401).json({ message: "Invalid username or password" });
  }
  // Compare submitted password with stored hashed password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    // If password does not match, respond with unauthorized
    return res.status(401).json({ message: "Invalid username or password" });
  }

   // Generate a signed JWT token with a 1-hour expiration
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  // Respond with the token and success message
  return res.status(200).json({
    success: true,
    message: "Login successful",
    token: token
  });
});

// Export the router to be used in the main server file
module.exports = router;

