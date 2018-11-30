var oracle = require('./oracle.js');
var vendor = require('./vendor');
var util = require('util');
var trans = require('./transactions');
module.exports = {
    //NEW ORDER (inventory page)
    addItem: async function (item, callback) {
        var sqlTemp = "INSERT INTO item(id, name, price, quantity, vendorid) VALUES (item_id_seq.nextval, '%s', %f, %d, %d)";
        oracle.open().then(function (conn) {
            let sql = util.format(sqlTemp, item.name, item.price, 0, item.vendor);
            oracle.runSql(sql, conn).then(function () {
                callback();
            });
        });
    },
    getInventory: async function (callback) {
        var sql = "select i.id, i.name, i.price, i.quantity, v.companyname from item i, vendor v where i.vendorid = v.id"
        oracle.open().then(function (conn) {
            var query = oracle.runSql(sql, conn);
            query.then(function (result) {
                oracle.close(conn);
                callback(result);
            })
        })
    },
    getItem: async function (id, callback) {
        var sql = "select * from item where id=" + id;
        oracle.open().then(function (conn) {
            oracle.runSql(sql, conn).then(function (result) {
                oracle.close(conn);
                callback(result);
            });
        });
    },
    updateItem: async function (item, callback) {
        var sqlTemp = "UPDATE item SET name='%s', price=%f, quantity=%d, vendorid=%d WHERE id=%d";
        var sqlTempQuantity = "UPDATE item SET quantity=%d WHERE id=%d";
        oracle.open().then(function (conn) {
            // For quantity update, a better condition could be used
            if (item.name == undefined) {
                sql = util.format(sqlTempQuantity, item.quantity, item.id);
            } else {
                sql = util.format(sqlTemp, item.name, item.price, item.quantity, item.vendorid, item.id);
            }
            console.log(sql)
            oracle.runSql(sql, conn).then(function () {
                oracle.close(conn);
                callback();
            });
        })
    }

}
