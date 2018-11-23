const express = require('express');
const app = express();
const port = 80;

app.use(express.static('public'));
app.use(require('./public/home'));
app.use(require('./public/profile'));

app.listen(port, () => console.log(`Listening on port ${port}!`));