var oracledb = require('oracledb');
var config = require('../config/dbconfig');

oracledb.autoCommit = true;

//modeule.exports allow function to be used in other files
module.exports = {
    open: async function(){
        // init connection
        let connection;
        try{
            connection = await oracledb.getConnection(  {
                user          : config.user,
                password      : config.pass,
                connectString : config.connectionStr
            });
        } catch(err){
            console.log(err);
        }
        return connection;
    },
    runSql: async function(sql, connection) {
        try {
            // execute sql
            bind = {};
            options = {
                outFormat: oracledb.OBJECT
            }
            result = await connection.execute(sql, bind, options);
        } catch (err) {
            console.error(err);
        }
        // return a promise
        return result;
    },
    close: async function(connection){
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
            console.log('closed');
        }
    }
}