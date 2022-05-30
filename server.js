// Load modules
const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Create express application
const app = express();

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Application routes
app.use(taskRoutes);
// To recognize the incoming request object as strings or arrays
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
  
// Listen on port 3000 for connections
async function init(){
  await app.listen(3000);
  console.log('Server running at http://localhost:3000');
}

init();