// Load modules
const taskModel = require('../models/taskModels');

// Index page controller
function task_index (request, response) {
  taskModel.getTasks((queryResult) => {
    console.log(queryResult);
    response.render('index', { users: queryResult });
  });
};

// About page controller
const task_about = (request, response) => {
    response.render('about');
};

// Create task page controllers
// GET
function task_create_get (request, response) {
  response.render('create');
};
// POST
function task_create_post (request, response) {
  const task = request.body.Task;
  const status = 'In progress';
  taskModel.createTask(task, status, (result) => {
    console.log(result);
    response.redirect('/');
  });
};


// Export controllers
module.exports = {
  task_index,
  task_about,
  task_create_get,
  task_create_post
};