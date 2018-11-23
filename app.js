const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 80;

app.use(bodyParser.urlencoded({
    extended: true
  }))
  
app.use(bodyParser.json())

app.use(express.static('public'));
app.use(require('./public/employees'))
app.use(require('./public/home'));
app.use(require('./public/profile'));
app.use(require('./public/item'));
app.use(require('./public/vendor'));

app.listen(port, () => console.log(`Listening on port ${port}!`));