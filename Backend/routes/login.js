const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Beispielhafter Speicher – in der Realität wäre das eine Datenbank
const users = require('./data/users');

const JWT_SECRET = "your_secret_key"; // Im echten Projekt .env nutzen

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Token erzeugen
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token: token
  });
});

module.exports = router;

