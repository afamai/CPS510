var express = require('express');
var router = express.Router();
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
    let views;
    ven.getVendors(function(result){
        // views = {vendors : result.rows}
        // console.log(views);
    });
    res.sendFile('item.html', {root: __dirname});
});

router.post('/item/add', function(req, res) {
    
});

module.exports = router
