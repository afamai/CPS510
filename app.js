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
app.use(require('./public/inventory'));
app.use(require('./public/vendor'));
<<<<<<< HEAD
app.use(require('./public/transactions'));
=======
app.use(require('./public/customer'));
>>>>>>> 9651ebd15e9e4681640432321148cd1c09dac5a9

app.listen(port, () => console.log(`Listening on port ${port}!`));