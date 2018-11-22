var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    
    res.sendFile('home.html', {root: __dirname});
});

module.exports = router