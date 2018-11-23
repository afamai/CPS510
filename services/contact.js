var oracle = require('./oracle.js');

module.exports = {
    insertContact: async function (contactModel) {
        oracle.open().then(function (c) {
            var query = oracle.runSql(
                'INSERT INTO contact (id, address, phone, email) VALUES (\'contact_id_seq.nextval\', )', c);
            query.then(function (result) {
                callback(result);
                oracle.close(c);
            })
        });
    },

    model() {
        this.adress;
        this.phone;
        this.email;
    }

}