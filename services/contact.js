var oracle = require('./oracle.js');

module.exports = {
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
    }

}