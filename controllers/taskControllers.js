// Load modules
const taskModel = require('../models/taskModels');

// Index page controller
function task_index (request, response) {
  taskModel.getUsers((queryResult) => {
    //console.log(queryResult);
    response.render('index', { users: queryResult });
  });
};

// About page controller
const task_about = (request, response) => {
    response.render('about');
};

// Create task page controllers
// GET
function create_user (request, response) {
  response.render('create');
};
// POST
function create_user_post (request, response) {
  const User = request.body;
  console.log(User);
  taskModel.createUser(User,(result) => {
    console.log(result);
    response.redirect('/');
  });
};


// Export controllers
module.exports = {
  task_index,
  task_about,
  create_user,
  create_user_post
};