// Load modules
const taskModel = require('../models/taskModels');
const jwt = require("jsonwebtoken");
let token = null;
var contraseña = '123456';

//Login page
//get
function signin_get(req,res){
  res.render('login');
 // res.send('login page');
}
//post
async function signin_post(req,res){
  const correo = JSON.stringify(req.body.correo);
  console.log(correo);

  let result = await taskModel.loginUser(correo, (user) => console.log(user));
  //printing the user found by email
  console.log(result);
  //token = jwt.sign({correo:correo},contraseña,{expiresIn: 60*60*24})
  //console.log(token);
  res.redirect('/');


  }


// Index page controller
function task_index (req, res) {
  //console.log(contraseña);
  //if(!token){
    //return res.status(401).json({
      //auth: false,
      //message: 'No token provided'
    //});
  //}

  //const decoded = jwt.verify(token,contraseña);
  //console.log(decoded);
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
    response.redirect('/');
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