// Load modules
const database = require('../utils/database.js');

// Get all users from database
const getUsers = (callback) => {
  const sql = `SELECT * FROM USERS`;
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      console.error(error.message);
     /// console.error("i dont know");

    }
    callback(rows);
  });
};

// Create new task
const createUser = (task, status, callback) => {
    const sql = `INSERT INTO Users (NOMBRES,A_MATERNO,A_PATERNO,DOMICILIO,CORREO)
    VALUES ('${task}', '${status}')`;
    database.appDatabase.run(sql, [], (error, row) => {
      if (error) {
        callback(error.message);
      }
      const successMessage = "The task was entered successfully."
      callback(successMessage);
    });
  };


// Export models
module.exports = {
  getUsers,
  createUser
};