var express = require('express');
var fs = require('fs');
var mustache = require('mustache');
var router = express.Router();
var db = require('../../services/vendor');

router.get('/vendor', function(req, res) {
    let view;
    db.getVendors(function(result){
        view = { vendor: result.rows }
        var html = fs.readFileSync("./public/vendor/vendor.html", 'utf8');
        var output = mustache.render(html, view);
        res.send(output);
    });
});

router.get('/vendor/profile/:id', function(req, res) {
    db.getVendorProfile(req.params.id, function(result){
        var view = result.rows[0];
        view["ID"] = req.params.id;
        var html = fs.readFileSync("./public/vendor/profile.html", 'utf8');
        var output = mustache.render(html, view);
        res.send(output);
    });
});
router.post('/vendor/profile/update', function(req, res) {
    db.updateVendor(req.body, function(){
        res.redirect('/vendor/profile/'+req.body.id);
    })
});
router.post('/vendor/add', function(req, res) {
    db.addVendor(req.body, function () {
        res.redirect('/vendor');
    })
});

module.exports = router
