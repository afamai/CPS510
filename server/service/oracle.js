var oracledb = require('oracledb');

// modeule.exports allow function to be used in other files
module.exports = {
    runSql: async function(sql) {
        let connection, result;
        try {
            // init connection
            connection = await oracledb.getConnection(  {
                user          : "oracle_dba",
                password      : "password",
                connectString : "192.168.56.102:1521/orcl"
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