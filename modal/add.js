var connection = require('./dbconnect.js');

function adddata(id, name, mobile, product, isedit) {
//console.log("iseditvalue"+isedit);
    return new Promise(function (resolve, reject) {

      
        if (isedit == 'add') {
            connection.query("INSERT INTO empdetail SET name = ?, mobile = ?, product = ?", [name.toString(), mobile.toString(), product.toString()], function (err, rows) {
                console.log(err);
           
                //if (err) throw err;
                if (err) {
                    //throw err;
                    console.log(err);

                    reject(err);
                } else {
                    resolve(rows);
                    //console.log(rows);
                }
            }); //var query = connection.query(query_str, function (err, rows, fields) {
        } if(isedit=='edit') {
            console.log("false");

            connection.query("UPDATE empdetail SET name = ?, mobile = ?, product = ? WHERE id=? ", [name.toString(), mobile.toString(), product.toString(), id], function (err, rows) {
               

                if (err) {
                    //throw err;
                    console.log(err);

                    reject(err);
                } else {
                    resolve(rows);
                    //console.log(rows);
                }
            });
        }

    });
}



module.exports = {
    adddata
};