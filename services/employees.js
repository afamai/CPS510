var oracle = require('./oracle.js');
var contact = require('./contact.js');
var util = require('util');
module.exports = {
    getEmployees: async function(callback){
        oracle.open().then(function(c){ 
            var query = oracle.runSql("select id, firstname, lastname, role from employee", c);
            query.then(function(result){
                callback(result);
                oracle.close(c);
            })
        });
    },
    addEmployee: async function(employee, callback){
        //create sql
        var withManagerTemp = "INSERT INTO employee(id, firstname, lastname, dateofbirth, sex, role, contactid, managerid) \
VALUES (employee_id_seq.nextval, '%s', '%s', TO_DATE('%s', 'YYYY-MM-DD'), '%s', '%s', %d, %d)"
        var noManagerTemp = "INSERT INTO employee(id, firstname, lastname, dateofbirth, sex, role, contactid) \
VALUES (employee_id_seq.nextval, '%s', '%s', TO_DATE('%s', 'YYYY-MM-DD'), '%s', '%s', %d)"          
        contact.addContact(employee.address, employee.phone, employee.email, function(contactid, conn){
            let sql;
            if(employee.managerid == ''){
                sql = util.format(noManagerTemp,  employee.firstname, employee.lastname, employee.birth, employee.sex, employee.role, contactid);
            } else{
                sql = util.format(withManagerTemp,  employee.firstname, employee.lastname, employee.birth, employee.sex, employee.role, contactid, employee.managerid);
            }
            var query = oracle.runSql(sql, conn);
            query.then(function(result){
                var getEmployeeId = oracle.runSql("select employee_id_seq.currval from DUAL", conn);
                getEmployeeId.then(function(r){
                    employeeid = r.rows[0].CURRVAL;
                    addPassword(employeeid, employee.password, conn);
                    callback();
                });
            })
        });
    },
    updateEmployee: async function(employee, callback){
        //create sql
        var withManagerTemp = "UPDATE employee SET firstname='%s', lastname='%s', dateofbirth=TO_DATE('%s', 'YYYY-MM-DD'), sex='%s', role='%s', managerid=%d WHERE id=%d";
        var noManagerTemp = "UPDATE employee SET firstname='%s', lastname='%s', dateofbirth=TO_DATE('%s', 'YYYY-MM-DD'), sex='%s', role='%s' WHERE id=%d";
        let sql;
        if(employee.managerid == ''){
            sql = util.format(noManagerTemp,  employee.firstname, employee.lastname, employee.birth, employee.sex, employee.role, employee.id);
        } else{
            sql = util.format(withManagerTemp,  employee.firstname, employee.lastname, employee.birth, employee.sex, employee.role, employee.managerid, employee.id);
        }
        oracle.open().then(function(conn){
            var query = oracle.runSql(sql, conn);
            query.then(function(result){
                contact.updateContact(employee.contactid, employee.address, employee.phone, employee.email, conn, function(){   
                    oracle.close(conn);
                    callback();
                });
            });
        })
    },
    getProfile: async function(emplyoeeId, callback){
        //create sql
        var sql = "select * FROM employee e, contact c WHERE e.contactid = c.id and e.id=" + emplyoeeId;
        oracle.open().then(function(conn){
            var query = oracle.runSql(sql, conn);
            query.then(function(employee){
                oracle.close(conn);
                callback(employee.rows[0]);
            });
        });
    }
}

var addPassword = async function(employeeid, password, conn){
    var sql = util.format("INSERT INTO login(employeeid, password) VALUES (%d, '%s')", employeeid, password);
    var query = oracle.runSql(sql, conn);
    query.then(function(){
        oracle.close(conn);
    });
}