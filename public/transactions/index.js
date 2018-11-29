var express = require('express');
var router = express.Router();

router.get('/transactions', function(req, res) {
    
    res.sendFile('transactions.html', {root: __dirname});
});

module.exports = router