// Load modules
const taskModel = require('../models/taskModels');
const jwt = require("jsonwebtoken");
const config = require("../utils/config");


//Login page
//get
function signin_get(req,res){
  res.render('login');
}
//post
function signin_post(req,res){
  const user = req.body;
  taskModel.loginUser(user,(isUser) => {
    if(isUser == undefined){      
      return res.send('No user found');
    }
    const token = jwt.sign({payload:user.correo},config.secret,{expiresIn: 60*60*24});
    res.cookie('JWT',token);
    return res.redirect('/');    
  });
  }


// Index page controller
function task_index (req, res) {
  taskModel.getUsers((queryResult) => {
    res.render('index', { users: queryResult });
  });
};

// About page controller
const task_about = (request, response) => {
    response.render('about');
};

// Create user page controllers
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
    response.redirect('/login');
  });
};

// Delete task page controllers
// GET
const user_delete_get = (request, response) => {
  const id = request.params.id;
  taskModel.getUser(id, (result) => {
    response.render('delete', { user: result });
  });
};
// POST
const user_delete_post = (request, response) => {
  const id = request.params.id;
  taskModel.deleteUser(id, () => {
    response.redirect('/');
  });
};

// Update task page controllers
// GET
const user_update_get = (request, response) => {
  const id = request.params.id;
  taskModel.getUser(id, (result) => {
    response.render('update', { user: result });
  });
};
// POST
const user_update_post = (request, response) => {
  const user = request.body;
  console.log(user);
  //const status = request.body.Status;
  const id = request.params.id;
  taskModel.updateUser(user, id, () => {
    response.redirect('/');
  });
};

// Export controllers
module.exports = {
  task_index,
  task_about,
  create_user,
  create_user_post,
  user_delete_get,
  user_delete_post,
  user_update_get,
  user_update_post,
  signin_get,
  signin_post
};