var oracle = require('./oracle.js');
var util = require('util');
var trans = require('./transactions');

module.exports = {
    newSales: async function (empID, sales, callback) {
        var sqlTemp = "INSERT INTO sale (id, transactionid, itemid, quantity) VALUES (sale_id_seq.nextval, %d, %d, %d)";
        oracle.open().then(function (conn) {
            trans.addTransaction(sales.customerid, sales.price, empID, "CASH", "SALE", conn, function (transactionid) {
                sales.items.forEach(function(item){
                    sql = util.format(sqlTemp, transactionid, item.itemid, item.quantity);
                    oracle.runSql(sql, conn).then(function () {
                    });
                })
                callback();
            });
        });
    }
}
