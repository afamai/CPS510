var express = require('express');
var router = express.Router();
var mustache = require('mustache');
var fs = require('fs');
var db = require('../../services/item');
var ven = require('../../services/vendor');

router.get('/inventory', function (req, res) {
    let view;
    ven.getVendors(function (vendors) {
        db.getInventory(function(items){
            view = { vendors: vendors.rows, items: items.rows }
            var html = fs.readFileSync("./public/inventory/inventory.html", 'utf8');
            var output = mustache.render(html, view);
            res.write(output);
            res.end();
        });
    });
});

router.post('/item/add', function (req, res) {
    console.log(req.body);
    db.addItem(req.body, function(){
        res.redirect('/inventory');
    })
});

module.exports = router
