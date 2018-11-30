var express = require('express');
var router = express.Router();
var fs = require('fs');
var mustache = require('mustache');
var trans = require('../../services/transactions');

router.get('/transactions', function(req, res) {
    let view;
    trans.getTransaction(function(transactions) {
        view = {transactions : transactions.rows};
        var html = fs.readFileSync("./public/transactions/transactions.html", 'utf8');
            var output = mustache.render(html, view);
            res.write(output);
            res.end();
    })
});

module.exports = router