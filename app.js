const express = require('express');
const tmp = require('./template')

//init
var oracle = require('./server/service/oracle.js')
const app = express();
const port = 80;


app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    tmp.loadHTML(res, '/header.html', '/index.html', '/footer.html');
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
// example. REMOVE LATER
result = oracle.runSql('select table_name from user_tables');
result.then(function(r){
    console.log(r);
})
