var express = require('express');
var router = express.Router();

var contact = require('../../services/contact')

//required for post?
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
// router.use(express.json());
// router.use(express.urlencoded());

router.get('/profile', function (req, res) {
    res.sendFile('profile.html', { root: __dirname })
});


router.post('/profile', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    //create model for new contact
    var newContact = contact.model;
    newContact.address = req.body.address;
    newContact.phone = req.body.phone;
    newContact.email = req.body.email;
    //insert new contact
    contact.insertContact(newContact);

    var loginQuery;
    // 'INSERT INTO Login (EmployeeID, Password, lastlogin) VALUES (1, '5f4dcc3b5aa765d61d8327deb882cf99', TO_DATE('2018-11-02 09:34:33', 'YYYY-MM-DD HH24:MI:SS'));'
    // result = oracle.runSql();
    // res.write('<h1>' + conQuery + '</h1><br>');
    // res.write('<h1>' + empQuery + '</h1>');
    res.end();
});

module.exports = router