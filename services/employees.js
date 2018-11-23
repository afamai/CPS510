var oracle = require('./oracle.js');

module.exports = {
    getEmployees: async function(callback){
        oracle.open().then(function(c){ 
            var query = oracle.runSql("select * from contact", c);
            query.then(function(result){
                callback(result);
                oracle.close(c);
            })
        });
    }
}