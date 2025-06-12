const express = require('express');
const router = express.Router();

const USERS = [{ username: "admin", password: "1234" }];

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);
  res.json({ success: !!user });
});

module.exports = router;
