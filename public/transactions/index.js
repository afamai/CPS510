var express = require('express');
var router = express.Router();
var fs = require('fs');
var mustache = require('mustache');
var trans = require('../../services/transactions');
var item= require('../../services/item');
var sale= require('../../services/sale');
var cusomter = require('../../services/customer');

router.get('/transactions', function(req, res) {
    let view;
    trans.getTransaction(function(transactions) {
        item.getInventory(function(results){
            cusomter.getCustomers(function(customers){
                view = {transactions : transactions.rows, items:results.rows, customers: customers};
                var html = fs.readFileSync("./public/transactions/transactions.html", 'utf8');
                var output = mustache.render(html, view);
                res.write(output);
                res.end();
            })
        })
    })
});

router.post('/sales/add', function(req, res) {
    items = JSON.parse(req.body.items);
    req.body.items = items;
    console.log(req.body)
    sale.newSales(req.cookies.id, req.body, function(){
        res.redirect('/transactions');
    });
});

module.exports = router