var express = require('express');
var router = express.Router();
var oracle = require('../../services/oracle');

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


router.post('/item/add', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var itemQuery =
        'INSERT INTO item (id, name, vendorid, price, quantity) VALUES (' +
        // req.body.contactid + ',' +
        '\'' + req.body.itemname + '\',' +
        '\'' + req.body.vendorid + '\',' +
        '\'' + req.body.itemprice + '\'' +
        '\'' + req.body.itemqty + '\'' +
        ')';
    
    res.write('<h1>' + itemQuery + '</h1><br>');
    
    res.end();
});

module.exports = router
