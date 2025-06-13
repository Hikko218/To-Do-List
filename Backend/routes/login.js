const express = require('express');               // Import Express framework
const router = express.Router();                  // Create a new router instance

// In-memory user list (in a real app, you'd use a database)
const USERS = [{ username: "admin", password: "1234" }];


/* POST route to handle login requests * The client sends { username, password } in the request body*/
router.post('/', (req, res) => {
  const { username, password } = req.body;                                                // Extract username and password from the request body
  const user = USERS.find(u => u.username === username && u.password === password);      // Check if the user exists in the USERS array
  res.json({ success: !!user });                                                        // Respond with success: true if user was found, otherwise false
});

// Export the router so it can be used in the main server file
module.exports = router;
