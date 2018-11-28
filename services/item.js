var oracle = require('./oracle.js');
var vendor = require('./vendor');
var util = require('util');
module.exports = {
    addItem: async function (item, callback) {
        var sqlTemp = "INSERT INTO item(id, name, price, quantity, vendorid) VALUES (item_id_seq.nextval, '%s', %f, 0, %d)";
        oracle.open().then(function (conn) {
            let sql = util.format(sqlTemp, item.name, item.price, item.vendor);
            oracle.runSql(sql, conn).then(function(){
                callback();
            });
        });
    },
    getInventory: async function(callback){
        var sql = "select i.id, i.name, i.price, i.quantity, v.companyname from item i, vendor v where i.vendorid = v.id"
        oracle.open().then(function(conn){
            var query = oracle.runSql(sql, conn);
            query.then(function(result){
                oracle.close(conn);
                callback(result);
            })
        })
    }

}
