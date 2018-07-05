var connection = require('./dbconnect.js');

function listdata(data)
{
  
    return new Promise(function(resolve, reject){ 
let wh='';
        if(data.length){

            
            wh=`where name LIKE '${data}' OR mobile LIKE '${data}' OR id LIKE '${data}' OR product LIKE '${data}'`;
}
    
        connection.query(`SELECT * FROM empdetail ${wh};`, function (err, rows) {

          console.log(err);
         
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



    module.exports = {listdata};