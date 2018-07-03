var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */


// create the connection setting 
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'emp'
});


// connecting with database
connection.connect();



var val;
router.get('/', function (req, res, next) {
  var sql = 'SELECT * FROM empdetail;';
  connection.query(sql, function (err, rows, fields) {

    val = req.query.VAL;
    if (err) {
      throw err;
    } else {
      obj = {
        print: rows
      };
      res.render('index', {
        title: 'Users',
        rows,
        suc: val
      });
    }

  });

});



//rout for new data
router.get('/add', function (req, res, next) {
  res.render('add');
});


router.post('/data', function (req, res) {

  var username = req.body.name;
  var mobile = req.body.mobile;
  var product = req.body.product;

  connection.query("INSERT INTO empdetail SET name = ?, mobile = ?, product = ?", [username.toString(), mobile.toString(), product.toString()], function (err, result) {
    if (err) throw err;

  });

  res.redirect('/?VAL=Added Successfully');

});



router.get('/edit', function (req, res, next) {
  var id = req.query.id;
  var sql = `SELECT * FROM empdetail where id= ${id};`;
  connection.query(sql, function (err, rows, fields) {


    if (err) {
      throw err;
    } else {
      obj = {
        print: rows
      };
      // res.render('index', obj);
      res.render('edit', {
        title: 'Users',
        rows
      });
    }

    //
  });

});


router.post('/dataedit', function (req, res) {
  var id = req.body.id;
  console.log(id);
  var username = req.body.name;
  console.log(username);
  var mobile = req.body.mobile;
  console.log(mobile);
  var product = req.body.product;
  console.log(product);

  connection.query("UPDATE empdetail SET name = ?, mobile = ?, product = ? WHERE id=? ", [username.toString(), mobile.toString(), product.toString(), id], function (err, result) {
    if (err) throw err;
  });
  res.redirect('/?VAL=Updated Successfully');
});

router.get('/delete', function (req, res, next) {
  var id = req.query.id;
  var sql = `DELETE FROM empdetail WHERE id= ${id};`;
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      throw err;
    } else {
      res.redirect('/?VAL=Deleted Successfully');
    }
  });
});



router.get('/error', function (req, res, next) {
  res.render('error', {
    title: 'Express'
  });
});




//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function (req, res) {
  res.render('notfound');
});

module.exports = router;
