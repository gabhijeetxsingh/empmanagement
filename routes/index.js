var express = require('express');
var mysql = require('mysql');
var adddata = require('../modal/add.js');
var listdata = require('../modal/list.js');
var connection = require('../modal/dbconnect.js');
var router = express.Router();
//console.log(addata);
/* GET home page. */




// connecting with database




var val;
router.get('/', function (req, res, next) {
  val = req.query.VAL;
  let searchval = req.query.searchstring || '';
  console.log(searchval);
  listdata.listdata(searchval)
    .then(function (rows) {



      obj = {
        print: rows
      };
      res.render('index', {
        title: 'Users',
        rows,
        suc: val
      });

    }).catch(function (e) {
      console.log("Catch handler " + e)
    });


});



//rout for new data
router.get('/add', function (req, res, next) {
  res.render('edit', {
    title: 'Users',
    rows: {
      name: '',
      mobile: '',
      product: ''
    },
    isedit: 'add'
  });
});


router.post('/data', function (req, res) {
  var id = req.body.id;
  var isedit = req.body.isedit;
  var name = req.body.name;
  var mobile = req.body.mobile;
  var product = req.body.product;
  adddata.adddata(name, mobile, product, isedit)
    .then(function (rows) {

    }).catch(function (e) {
      console.log("Catch handler " + e)
    });



  // connection.query("INSERT INTO empdetail SET name = ?, mobile = ?, product = ?", [username.toString(), mobile.toString(), product.toString()], function (err, result) {
  //   if (err) throw err;

  // });

  res.redirect('/?VAL=Added Successfully');

});



router.get('/edit', function (req, res) {
  var id = req.query.id;
  var sql = `SELECT * FROM empdetail where id= ${id};`;
  connection.query(sql, function (err, rows, fields) {


    res.render('edit', {
      title: 'Users',
      rows: rows[0],
      isedit: 'edit'
    });


    //
  });

});


router.post('/dataedit', function (req, res) {
  var id = req.body.id;
  var isedit = req.body.isedit;
  var name = req.body.name;
  var mobile = req.body.mobile;
  var product = req.body.product;


  adddata.adddata(id, name, mobile, product, isedit)
    .then(function (rows) {
      console.log(rows);
    }).catch(function (e) {
      console.log("Catch handler " + e)
    });


  res.redirect('/?VAL=Updated Successfully');
});

router.get('/delete', function (req, res) {
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