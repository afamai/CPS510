var oracle = require('./oracle.js');
var util = require('util');
module.exports = {
    // Very secure login
    getLoginEmployeeID: async function (login, callback) {
        var sql = "SELECT e.firstname, e.lastname, l.employeeid FROM employee e, contact c, login l WHERE e.contactid = c.id AND c.email ='" + login.email + "' AND l.password = '" + login.password + "'";
        oracle.open().then(function (conn) {
            oracle.runSql(sql, conn).then(function (result) {
                callback(result.rows[0]);
                oracle.close(conn);
            });
        });
    }

}
