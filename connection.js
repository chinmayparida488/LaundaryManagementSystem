var mysql = require('mysql');

var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "lms"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connection Successfull...");
// });

module.exports = con;