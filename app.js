const express = require('express')
const app = express();
const port = 80;

app.get('/', function (req, res) {
    res.send('<h1>Home</h1>')
})

app.listen(port, () => console.log(`Listening on port ${port}!`))