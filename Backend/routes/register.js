const express = require('express');           // Import the Express framework
const router = express.Router();              // Create a new router instance
const bcrypt = require('bcrypt');             // Import bcrypt for password hashing

const fs = require('fs');                     // File system module to read/write files
const path = require('path');                 // Path module for cross-platform file paths
const usersPath = path.join(__dirname, './data/users.json');  // Path to the JSON file storing user data

// Function to load users from the JSON file
function loadUsers() {
  const data = fs.readFileSync(usersPath);      // Read the file content
  return JSON.parse(data);                      // Parse the JSON string into a JavaScript object
}

// Function to save users to the JSON file
function saveUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));  // Write formatted JSON to the file
}
// Route for handling user registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;                  // Extract username and password from request body

   // Validate input: both username and password are required
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.', success: false });
  }

  const users = loadUsers();                          // Load existing users from file
  const userExists = users.find(u => u.username === username);    // Check if user already exists
  if (userExists) {
    return res.status(409).json({ message: 'Username already exists.', success: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);           // Hash the password with bcrypt
  users.push({ username, password: hashedPassword });               // Add the new user to the user list
  saveUsers(users);                                                 // Save the updated user list to file

  return res.status(201).json({ message: 'User registered successfully.', success: true });
});
// Export the router to be used in the main app
module.exports = router;
