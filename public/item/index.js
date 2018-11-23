var express = require('express');
var router = express.Router();
var mustache = require('mustache');
var fs = require('fs');
var db = require('../../services/item');
var ven = require('../../services/vendor');

//required for post?
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
// router.use(express.json());
// router.use(express.urlencoded());

router.get('/item', function(req, res) {
    res.sendFile( 'item.html', { root: __dirname })
});

router.get('/item/add', function (req, res) {
    let view;
    ven.getVendors(function (result) {
        view = { vendors: result.rows }
        // console.log(view);
        var html = fs.readFileSync("./public/item/additem.html", 'utf8');
        var output = mustache.render(html, view);
        res.write(output);
        res.end();
    });
    
    
    // res.sendFile('item.html', {root: __dirname});
});

router.post('/item/add', function (req, res) {
    db.addItem(req.body, function(){
        console.log("Item Added");
        res.redirect('/item');
    })
});

module.exports = router
