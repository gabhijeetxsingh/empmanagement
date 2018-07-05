var connection = require('./dbconnect.js');

function getLastRecord(name,mobile,product)
{
  console.log("comming");
    return new Promise(function(resolve, reject){ 

        console.log(name+" "+mobile+" "+product);
        connection.query("INSERT INTO empdetail SET name = ?, mobile = ?, product = ?", [name.toString(), mobile.toString(), product.toString()], function (err, rows) {
          console.log(err);
          console.log(rows);
            //if (err) throw err;
            if (err) {
                //throw err;
                console.log(err);
               
                reject(err);
            }
            else {
                resolve(rows);
                //console.log(rows);
            }
        }); //var query = connection.query(query_str, function (err, rows, fields) {
    });
}



    module.exports = {getLastRecord};