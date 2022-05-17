// Load modules
const express = require('express');
const taskController = require('../controllers/taskControllers');

//  Create route handler
const router = express.Router();

// Respond when a GET request is made to the index page
router.get('/', taskController.task_index);

// GET About Page
router.get('/about', taskController.task_about);

// GET/POST Create page
router.get('/user/create', taskController.create_user);
router.post('/user/create', taskController.create_user_post);

// Export router
module.exports = router;