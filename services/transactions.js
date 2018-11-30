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
    addTransaction: async function (item, empID, paymenttype, type, conn, callback) {
        //create sql
        var sqlTemp = "INSERT INTO transactions (id, timestamp, employeeid, clientid, paymenttype, type, total) VALUES\
         (transaction_id_seq.nextval, TO_DATE('%s', 'YYYY-MM-DD-HH24-MI-SS'), %d, %d, '%s', '%s', %d)";
        
        //get CLIENT ID from VENDOR
        var cliSQL = "SELECT cli.id FROM clients cli WHERE cli.vendorid = '" + item.vendor + "'";
        oracle.runSql(cliSQL, conn).then(function(result){
            let sql = util.format(sqlTemp, getDateTime(), empID, result.rows[0].ID, paymenttype, type, Math.round(item.quantity * item.price *100)/100);
            console.log(sql);
            oracle.runSql(sql, conn).then(function() {
                callback();
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
