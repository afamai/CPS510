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

router.get('/item/:id', function(req, res){
    ven.getVendors(function (vendors) {
        db.getItem(req.params.id, function(item){
            var view = item.rows[0];
            view['vendors'] = vendors.rows;
            view.vendors.forEach(function(vendor){
                if(vendor.ID == view.VENDORID){
                    vendor.sel = true;
                }
            })
            var html = fs.readFileSync("./public/inventory/item.html", 'utf8');
            var output = mustache.render(html, view);
            res.write(output);
            res.end();
        });
    });
});

router.post('/item/add', function (req, res) {
    db.addItem(req.body, function(){
        res.redirect('/inventory');
    })
});


router.post('/item/update', function(req, res){
    db.updateItem(req.body, function(){
        res.redirect('/item/'+req.body.id);
    });
});


// updating quantity
router.post('/item/order', function(req, res){

    db.getItem(req.body.id, function(item) {
        // Update item quantity
        var quantity;
        req.body.quantity == '' ? quantity = '0':  quantity = req.body.quantity ;
        var itemFetched = item.rows[0];

        var item = {};
        item.quantity = parseInt(quantity)+itemFetched.QUANTITY;
        item.id = req.body.id;
        db.updateItem(item, function(){});
    });
    
    res.redirect('/inventory');
});


module.exports = router
