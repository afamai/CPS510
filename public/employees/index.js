var express = require('express');
var mustache = require('mustache');
var fs = require('fs');
var db = require('../../services/employees');
var router = express.Router();

router.get('/employees', function(req, res) {
    let view;
    db.getEmployees(function(result){
        view = { employees: result.rows }
        console.log(view);
        var html = fs.readFileSync("./public/employees/employees.html", 'utf8');
        var output = mustache.render(html, view);
        res.send(output);
    });
});

router.post('/employees/add/', function(req, res){
    db.addEmployee(req.body, function(){
        console.log("Employee Added");
        res.redirect('/employees');
    });
});

module.exports = router