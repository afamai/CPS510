var oracle = require('./oracle.js');
var util = require('util');


function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + sec;

}


module.exports = {
    addTransaction: async function (clientid, price, empID, paymenttype, type, conn, callback) {
        //create sql
        var sqlTemp = "INSERT INTO transactions (id, timestamp, employeeid, clientid, paymenttype, type, total) VALUES\
         (transaction_id_seq.nextval, TO_DATE('%s', 'YYYY-MM-DD-HH24-MI-SS'), %d, %d, '%s', '%s', %d)";
        
        //get CLIENT ID from VENDOR
        if(type == 'ORDER'){
            var cliSQL = "SELECT cli.id FROM clients cli WHERE cli.vendorid = '" + clientid + "'";
        } else {
            var cliSQL = "SELECT cli.id FROM clients cli WHERE cli.customerid = '" + clientid + "'";
        }
        oracle.runSql(cliSQL, conn).then(function(result){
            //sql for transaction
            let sql = util.format(sqlTemp, getDateTime(), empID, result.rows[0].ID, paymenttype, type, price);  
            oracle.runSql(sql, conn).then(function() {
                //get transactionid for callback
                var getTransactionId = oracle.runSql("select transaction_id_seq.currval from DUAL", conn);
                getTransactionId.then(function(r){
                    transactionid = r.rows[0].CURRVAL;
                    callback(transactionid);
                });
            });
        });

    },

    getTransaction: async function(callback){
        oracle.open().then(function(conn){ 
            var query = oracle.runSql("SELECT timestamp, type, total FROM transactions", conn);
            query.then(function(result){
                // console.log(result);
                callback(result);
                oracle.close(conn);
            })
        });
    },
}
