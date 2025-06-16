const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Path to the JSON file that stores user data
const usersPath = path.join(__dirname, './data/users.json');

// Load users from the JSON file
function loadUsers() {
  const data = fs.readFileSync(usersPath);
  return JSON.parse(data);
}

// Save the updated user list back to the JSON file
function saveUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

// DELETE route for deleting a user account
// Endpoint: DELETE /api/account
router.delete('/account', (req, res) => {
  const { username, password } = req.body;

  // Validate input: both username and password must be provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const users = loadUsers();

  // Find the user by username
  const userIndex = users.findIndex(u => u.username === username);

  // If user does not exist, return 404
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const user = users[userIndex];

  // Verify the provided password using bcrypt
  bcrypt.compare(password, user.password, (err, match) => {
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    // Remove the user from the list
    users.splice(userIndex, 1);

    // Save the updated user list
    saveUsers(users);

    // Respond with success message
    return res.status(200).json({ message: 'Account deleted successfully.', success: true });
  });
});

module.exports = router;
