const express = require('express');
const tmp = require('./template')

//init
const app = express();
const port = 80;


app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    tmp.loadHTML(res, '/header.html', '/index.html', '/footer.html');
});

app.listen(port, () => console.log(`Listening on port ${port}!`));