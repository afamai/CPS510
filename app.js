const express = require('express');

//init
var oracle = require('./server/service/oracle.js')
const app = express();
const port = 80;

app.use(require('./views'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
// example. REMOVE LATER
result = oracle.runSql('select table_name from user_tables');
result.then(function(r){
    console.log(r);
});