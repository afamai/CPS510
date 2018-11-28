var express = require('express');
var fs = require('fs');
var mustache = require('mustache');
var dateFormat = require('dateformat');
var db = require('../../services/employees');
var router = express.Router();

var contact = require('../../services/employees')

router.get('/profile/:id', function (req, res) {
    db.getProfile(req.params.id, function(employee, contact){
        var view = {
            id: req.params.id,
            contactid: contact.ID,
            firstname: employee.FIRSTNAME,
            lastname: employee.LASTNAME,
            birth: dateFormat(employee.DATEOFBIRTH, "yyyy-mm-dd"),
            position: employee.ROLE,
            address: contact.ADDRESS,
            phone: contact.PHONE,
            email: contact.EMAIL,
            managerid: employee.MANAGERID,
            gender: employee.SEX,
            isMale: function() {
                return this.gender == 'M';
            },
            isFemale: function() {
                return this.gender == 'F';
            },
            isOther: function(){
                return this.gender == 'O';
            }
        };
        var html = fs.readFileSync("./public/profile/profile.html", 'utf8');
        var output = mustache.render(html, view);
        res.send(output);
    });
});

router.post('/profile/update/', function(req, res){
    db.updateEmployee(req.body, function(){
        res.redirect('/profile/'+req.body.id);
    });
});

module.exports = router