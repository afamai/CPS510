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
            var query = oracle.runSql("select v.id, v.companyname, v.contactid, c.address, c.phone, c.email from vendor v, contact c WHERE c.id=v.contactid", c);
            query.then(function(result){
                oracle.close(c);
                callback(result);
            });
        });
    },
    getVendorProfile: async function(id, callback){
        oracle.open().then(function(conn){
            var sql = "select * FROM vendor v, contact c WHERE v.contactid = c.id and v.id=" + id;
            oracle.runSql(sql, conn).then(function(result){
                oracle.close(conn);
                callback(result);
            });
        });
    },
    updateVendor: async function(vendor, callback){
        var sqlTemp = "UPDATE vendor SET companyname=%s WHERE id=%d"
        oracle.open().then(function(conn){
            var sql = util.format(sqlTemp, vendor.companyname, vendor.id);
            oracle.runSql(sql, conn).then(function(){
                contact.updateContact(vendor.contactid, vendor.address, vendor.phone, vendor.email, conn, function(){
                    oracle.close(conn);
                    callback();
                })
            });
        });
    }
}
