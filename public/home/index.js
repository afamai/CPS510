var express = require('express');
var router = express.Router();
var mustache = require('mustache');
var login = require('../../services/login');
var fs = require('fs');

var view;

router.get('/', function (req, res) {
    view = {EMPLOYEEID: req.cookies.id, FIRSTNAME: req.cookies.firstname, LASTNAME: req.cookies.lastname}
    var html = fs.readFileSync("./public/home/home.html", 'utf8');
    var output = mustache.render(html, view);
    res.send(output);
});

router.post('/login', function (req, res) {
    login.getLoginEmployeeID(req.body, function (result) {
        if (result) {
            console.log("logging in as " + req.body.email + "/" + req.body.password)
            res.cookie('id', result.EMPLOYEEID);
            res.cookie('firstname', result.FIRSTNAME);
            res.cookie('lastname', result.LASTNAME);
        } else {
            console.log('cannot find login');
        }
        res.redirect('/');
    });
});

router.get('/logout', function (req, res) {
    res.clearCookie('id');
    res.clearCookie('firstname');
    res.clearCookie('lastname');
    res.redirect('/');
});

module.exports = router