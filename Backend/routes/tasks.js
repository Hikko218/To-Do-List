const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const tasksPath = path.join(__dirname, './data/userTasks.json');
const authenticateToken = require('../authMiddleware');

// Helferfunktionen
function loadTasks() {
  if (!fs.existsSync(tasksPath)) fs.writeFileSync(tasksPath, '{}');
  const data = fs.readFileSync(tasksPath);
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
}

// GET Tasks
router.get('/', authenticateToken, (req, res) => {
  const username = req.user.username;
  const allTasks = loadTasks();
  res.json(allTasks[username] || []);
});

// POST Task hinzufügen
router.post('/', authenticateToken, (req, res) => {
  const username = req.user.username;
  const { text, done } = req.body;
  if (!text) return res.status(400).json({ message: 'Text fehlt.' });

  const allTasks = loadTasks();
  if (!allTasks[username]) allTasks[username] = [];

  allTasks[username].push({ text, done: !!done });
  saveTasks(allTasks);
  res.status(201).json({ success: true });
});

// PUT Tasks aktualisieren (komplett überschreiben)
router.put('/', authenticateToken, (req, res) => {
  const username = req.user.username;
  const { tasks } = req.body;
  if (!Array.isArray(tasks)) return res.status(400).json({ message: 'Tasks müssen ein Array sein.' });

  const allTasks = loadTasks();
  allTasks[username] = tasks;
  saveTasks(allTasks);
  res.json({ success: true });
});

module.exports = router;
