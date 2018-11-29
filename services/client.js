var oracle = require('./oracle.js');
var util = require('util');
module.exports = {
    addClientID: async function(id, type, conn, callback){
        var customerClient = util.format("INSERT INTO clients (id, customerid) VALUES (client_id_seq.nextval, %d)", id);
        var vendorClient = util.format("INSERT INTO clients (id, vendorid) VALUES (client_id_seq.nextval, %d)", id);

        let sql;
        if(type == "customer"){
            sql = customerClient;
        } else {
            sql = vendorClient;
        }

        var query = oracle.runSql(sql, conn);
        query.then(function (result) {
            var getContactId = oracle.runSql('select client_id_seq.currval from DUAL', conn);
            getContactId.then(function(r){
                if(callback){
                    callback(r.rows[0].CURRVAL, conn);
                } else {
                    oracle.close(conn);
                }
            })
        })
    }

}