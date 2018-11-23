var oracle = require('./oracle.js');
var contact = require('./contact');
var util = require('util');
module.exports = {

    addVendor: async function (vendor, callback) {
        //create sql
        var sqlTemp = "INSERT INTO vendor(id, companyname, contactid) VALUES (vendor_id_seq.nextval, '%s', %d)";
        contact.addContact(vendor.address, vendor.phone, vendor.email, function (contactid, conn) {
            let sql = util.format(sqlTemp, vendor.companyname, contactid);
            oracle.runSql(sql, conn);
            callback();
        });
    },

    getVendors: async function(callback){
        oracle.open().then(function(c){ 
            var query = oracle.runSql("SELECT id, companyname, contactid FROM vendor", c);
            query.then(function(result){
                callback(result);
                oracle.close(c);
            })
        });
    }
}
