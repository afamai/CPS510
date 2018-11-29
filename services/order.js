var oracle = require('./oracle.js');
var util = require('util');
module.exports = {
    addOrder : async function (order, callback) {
        var sqlTemp = "INSERT INTO order (id, transactionid, itemid, quantity) VALUES (%d, %d, %d, %d)";
        oracle.open().then(function (conn) {
            let sql = util.format(sqlTemp, order.id, order.transactionid, order.itemid, order,quantity);
            oracle.runSql(sql, conn).then(function(){
                callback();
            });
        });
    }
}
