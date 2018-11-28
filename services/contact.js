var oracle = require('./oracle.js');
var util = require('util');
module.exports = {
    addContact: async function (address, phone, email, callback) {
        // create sql
        var sql = util.format("INSERT INTO contact (id, address, phone, email) VALUES (contact_id_seq.nextval, '%s', '%s', '%s')", address, phone, email);
        oracle.open().then(function (conn) {
            // run sql to insert new sql
            var query = oracle.runSql(sql, conn);
            query.then(function (result) {
                // run 2nd sql to get contact id
                var getContactId = oracle.runSql('select contact_id_seq.currval from DUAL', conn);
                getContactId.then(function(r){
                    if(callback){
                        // run callback to perform additional queries
                        callback(r.rows[0].CURRVAL, conn);
                    } else {
                        oracle.close(conn);
                    }
                })
            })
        });
    }, 
    updateContact: async function(id, address, phone, email, conn, callback){
        var sql = util.format("UPDATE contact SET address='%s', phone='%s', email='%s' WHERE id=%d", address, phone, email, id);
        var query = oracle.runSql(sql, conn);
        query.then(function (result) {
            callback();
        });
    }
}