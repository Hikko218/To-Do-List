const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, './data/users.json');

// Nutzer aus Datei laden
function loadUsers() {
  const data = fs.readFileSync(usersPath);
  return JSON.parse(data);
}

// Nutzer speichern
function saveUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.', success: false });
  }

  const users = loadUsers();
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(409).json({ message: 'Username already exists.', success: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  saveUsers(users);

  return res.status(201).json({ message: 'User registered successfully.', success: true });
});

module.exports = router;
