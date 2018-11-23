var express = require('express');
var router = express.Router();
var db = require('../../services/vendor')

//required for post?
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
// router.use(express.json());
// router.use(express.urlencoded());

router.get('/vendor', function(req, res) {
    res.sendFile( 'vendor.html', { root: __dirname })
});


router.post('/vendor/add', function(req, res) {
    db.addVendor(req.body, function () {
        console.log("Vendor Added");
        // res.write("Vendor Added");
        // res.end();
        res.redirect('/employees');
    })
});

module.exports = router
