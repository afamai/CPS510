var oracle = require('./oracle.js');
var util = require('util');
module.exports = {
<<<<<<< HEAD
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
=======
    insertContact: async function (contactModel) {
        oracle.open().then(function (c) {
            var sql = `INSERT INTO contact (id, address, phone, email) VALUES (contact_id_seq.nextval, '${contactModel.address}', '${contactModel.phone}', '${contactModel.email}; commit;')`
            var query = oracle.runSql(sql, c);
                console.log(sql);
                
            query.then(function () {
                console.log(query);
                oracle.close(c);
            })
        });
    },

    model() {
        address,
        phone,
        email
>>>>>>> 1099510868a5b79e76b038de6a8e196da9ed582f
    }
}