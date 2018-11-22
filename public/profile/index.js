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

router.get('/profile', function(req, res) {
    res.sendFile( 'profile.html', { root: __dirname })
});


router.post('/profile', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var conQuery =
        'INSERT INTO contact (id, address, phone, email) VALUES (' +
        // req.body.contactid + ',' +
        '\'' + req.body.address + '\',' +
        '\'' + req.body.phone + '\',' +
        '\'' + req.body.email + '\'' +
        ')';
    var empQuery =
        'INSERT INTO employee (id, firstname, lastname, dateofbirth, sex, role, managerid, contactid) VALUES (' +
        // req.body.employeeid + ',' +
        '\'' + req.body.firstname + '\',' +
        '\'' + req.body.lastname + '\',' +
        'TO_DATE(\'' + req.body.birth + '\', \'YYYY-MM-DD\') ,' +
        '\'' + req.body.sex + '\',' +
        '\'' + req.body.role + '\',' +
        req.body.managerid + ',' +
        // req.body.contactid +
        ')';
    // result = oracle.runSql();
    res.write('<h1>' + conQuery + '</h1><br>');
    res.write('<h1>' + empQuery + '</h1>');
    res.end();
});

module.exports = router