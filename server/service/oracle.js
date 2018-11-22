var oracledb = require('oracledb');
var config = require('../../config/dbconfig');

// modeule.exports allow function to be used in other files
module.exports = {
    runSql: async function(sql) {
        let connection, result;
        try {
            // init connection
            connection = await oracledb.getConnection(  {
                user          : config.user,
                password      : config.pass,
                connectString : config.connectionStr
            });
            
            // execute sql
            result = await connection.execute(sql);
        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
        // return a promise
        return result;
    }
}