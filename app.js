const express = require('express');
const app = express();
const port = 80;

app.set('view engine', 'pug')
app.use(express.static('public'));
app.use(require('./public'));

app.listen(port, () => console.log(`Listening on port ${port}!`));