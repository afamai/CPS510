const express = require('express');
var oracle = require('./server/service/oracle.js')
const app = express();
const port = 80;

app.get('/', function (req, res) {
    res.send('<h1>Home</h1>')
})

// example. REMOVE LATER
result = oracle.runSql('select table_name from user_tables');
result.then(function(r){
    console.log(r);
})
app.listen(port, () => console.log(`Listening on port ${port}!`))