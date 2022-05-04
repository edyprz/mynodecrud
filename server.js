// Load modules
const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

// Create express application
const app = express();

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
// Application routes
app.use(taskRoutes);
// To recognize the incoming request object as strings or arrays
app.use (express.urlencoded ({extended: true}));
  
// Listen on port 8080 for connections
app.listen(8080, () => {
    console.log('Server started and listening at http://localhost:8080');
  });