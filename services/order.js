var oracle = require('./oracle.js');
var util = require('util');
var trans = require('./transactions');

module.exports = {
    newOrder: async function (order, empID, callback) {
        var sqlTemp = "INSERT INTO orders (id, transactionid, itemid, quantity) VALUES (order_id_seq.nextval, %d, %d, %d)";
        oracle.open().then(function (conn) {
            trans.addTransaction(order, empID, "BUSSINESS", "ORDER", conn, function (transactionid) {
                let sql = util.format(sqlTemp, transactionid, order.id, order.quantity);
                console.log(sql)
                oracle.runSql(sql, conn).then(function () {
                    callback();
                });
            });
        });
    }
}
