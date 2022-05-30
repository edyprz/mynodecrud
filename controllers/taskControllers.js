// Load modules
const taskModel = require('../models/taskModels');
const jwt = require("jsonwebtoken");


//Login page
//get
function signin_get(req,res){
  res.render('login');
}
//post
function signin_post(req,res){
  //console.log(req.body)
  const {correo,contrasena} = req.body;
  //console.log(req.cookies.token);


  taskModel.loginUser(correo,(user) => {
    //console.log(user);
    if(user == undefined){      
      
      return res.send('No user found');
      //res.redirect('/login');
    }
    const token = jwt.sign({payload:correo},contrasena,{expiresIn: 60*60*24});
    //console.log(token)
    res.cookie('JWT',token);
    //console.log(res.cookie)
    //console.log('Cookies: ', req.cookies)
    //console.log('Signed Cookies: ', req.signedCookies)
    return res.redirect('/');    
  });
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