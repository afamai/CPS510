var express = require('express');
var db = require('../../services/employees');
var router = express.Router();

router.get('/employees', function(req, res) {
    db.getEmployees(function(result){
        console.log(result);

    });
    res.sendFile('employees.html', {root: __dirname});
});

router.post('/employees/add/', function(req, res){
    db.addEmployee(req.body, function(){
        console.log("Employee Added");
    });
    res.send('hello');
});

module.exports = router