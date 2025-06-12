const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: "*", // für Testzwecke, im echten Projekt gezielt einschränken
  methods: ["GET", "POST"],
  credentials: false
}));

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

app.listen(3000, '0.0.0.0', () => console.log('Server läuft auf Port 3000'));