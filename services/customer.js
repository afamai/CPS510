var oracle = require('./oracle.js');
var contact = require('./contact.js');
var util = require('util');
module.exports = {
    
    addCustomer: async function(customer, callback){
        //create sql
        var sqlTemp = "INSERT INTO customer(id, firstname, lastname, points, contactid) \
VALUES (customer_id_seq.nextval, '%s', '%s',0, %d)"      
        contact.addContact(customer.address, customer.phone, customer.email, function(contactid, conn){
            var sql = util.format(sqlTemp, customer.firstname, customer.lastname, contactid);
            var query = oracle.runSql(sql, conn);
            query.then(function(result){
                oracle.close(conn);
                callback();
            })
        });
    },
    getCustomers: async function(callback){
        oracle.open().then(function(conn){
            var sql = "SELECT * FROM customer";
            oracle.runSql(sql, conn).then(function(result){
                oracle.close(conn);
                callback(result.rows);   
            });
        })
    },
    getProfile: async function(customerId, callback){
        //create sql
        var sql = "select * FROM customer e, contact c WHERE e.contactid = c.id and e.id=" + customerId;
        oracle.open().then(function(conn){
            var query = oracle.runSql(sql, conn);
            query.then(function(customer){
                oracle.close(conn);
                callback(customer);
            });
        });
    },
    updateCustomer: async function(customer, callback){
        var sqlTemp = "UPDATE customer SET firstname='%s', lastname='%s', points=%d WHERE id=%d"
        oracle.open().then(function(conn){
            var sql = util.format(sqlTemp, customer.firstname, customer.lastname, customer.points, customer.id);
            oracle.runSql(sql, conn).then(function(){
                contact.updateContact(customer.contactid, customer.address, customer.phone, customer.email, conn, function(){
                    oracle.close(conn);
                    callback();
                })
            });
        });
    }
}