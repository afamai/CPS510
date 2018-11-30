var express = require('express');
var mustache = require('mustache');
var fs = require('fs');
var db = require('../../services/customer');
var router = express.Router();

// load page
router.get('/customers', function(req, res) {
    db.getCustomers(function(result){
        view = { customers:result }
        var html = fs.readFileSync("./public/customer/customer.html", 'utf8');
        var output = mustache.render(html, view);
        res.send(output);
    });

});
router.post('/customers/add', function(req, res){
    console.log(req.body);
    db.addCustomer(req.body, function(){
        res.redirect("/customers");
    })
});
router.get('/customers/profile/:id', function(req, res) {
    db.getProfile(req.params.id, function(result){
        var view = result.rows[0];
        view["ID"] = req.params.id;
        var html = fs.readFileSync("./public/customer/profile.html", 'utf8');
        var output = mustache.render(html, view);
        res.send(output);
    });
});
router.post('/customers/profile/update', function(req, res) {
    console.log(req.body);
    db.updateCustomer(req.body, function(result){
        res.redirect('/customers/profile/'+req.body.id);
    })
});

module.exports = router