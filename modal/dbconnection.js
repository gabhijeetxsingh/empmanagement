var mysql = require('mysql');

 global.readdb= mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "emp"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("select * from empdetail", function (err, result) {
    if (err) throw err;
    console.log(con);
  });
  console.log("Connected!");
});

