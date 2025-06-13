const express = require('express');                  // Import the Express framework
const app = express();                               // Create an Express application instance

app.use(express.json());                             // Middleware to parse JSON bodies in incoming requests

const cors = require('cors');                        // Import CORS middleware

// Enable CORS to allow requests from specific origin (frontend, e.g., local HTML file)

app.use(cors({
  origin: "http://127.0.0.1:5500",                  // Allow this origin to access the backend            
  methods: ["GET", "POST", "PUT", "DELETE"],        // Allowed HTTP methods
  credentials: false                                // No cookies or credentials are sent
}));

// Import login route and use it under '/login' path

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

// Define a simple GET route for root path

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Start the server on port 3000, accessible from any IP on the machine

app.listen(3000, '0.0.0.0', () => console.log('Server läuft auf Port 3000'));