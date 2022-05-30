// Load modules
const express = require('express');
const taskController = require('../controllers/taskControllers');
const {requireAuth} = require('../middlewares/authmiddleware');


//  Create route handler
const router = express.Router();



//login
router.get('/login',taskController.signin_get);
router.post('/login',taskController.signin_post);

// Respond when a GET request is made to the index page
router.get('/',requireAuth,taskController.task_index);

// GET About Page
router.get('/about',requireAuth,taskController.task_about);

// GET/POST Create user
router.get('/user/create',requireAuth , taskController.create_user);
router.post('/user/create', taskController.create_user_post);

// GET/POST  Update user
router.get('/user/update/:id',requireAuth, taskController.user_update_get);
router.post('/user/update/:id', taskController.user_update_post);

// GET/POST Delete user
router.get('/user/delete/:id', requireAuth ,taskController.user_delete_get);
router.post('/user/delete/:id', taskController.user_delete_post);



// Export router
module.exports = router;