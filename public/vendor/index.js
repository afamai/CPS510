var express = require('express');
var fs = require('fs');
var mustache = require('mustache');
var router = express.Router();
var db = require('../../services/vendor')

router.get('/vendor', function(req, res) {
    let view;
    db.getVendors(function(result){
        view = { vendor: result.rows }
        var html = fs.readFileSync("./public/vendor/vendor.html", 'utf8');
        var output = mustache.render(html, view);
        res.send(output);
    });
});

router.post('/vendor/add', function(req, res) {
    db.addVendor(req.body, function () {
        res.redirect('/vendor');
    })
});

module.exports = router
