var oracle = require('./oracle.js');
var vendor = require('./vendor');
var util = require('util');
module.exports = {

    addItem: async function (item, callback) {
        var sqlTemp = "INSERT INTO item(id, name, price, quantity, vendorid) VALUES (item_id_seq.nextval, '%s', %d, %d, %d)";
        oracle.open().then(function (conn) {
            let sql = util.format(sqlTemp, item.name, item.price, item.quantity, item.vendor);
            oracle.runSql(sql, conn);
            callback();
        });
    }


}
