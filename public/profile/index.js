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

    //create Query for new contact
    var conQuery =
        'INSERT INTO contact (id, address, phone, email) VALUES (' +
        'contact_id_seq.nextval ,' +
        '\'' + req.body.address + '\',' +
        '\'' + req.body.phone + '\',' +
        '\'' + req.body.email + '\'' +
        ')';
    var newContact = contact.model();
    newContact.address = req.body.address;
    newContact.phone = req.body.phone;
    newContact.email = req.body.email;

    contact.insertContact(contactmodel)




    //add contact to db
    // oracle.runSql(conQuery);

    // var contactSel = oracle.runSql('SELECT * FROM contact');
    // contactSel.then(function (r) {
    //     console.log('This is Contact Query: ')
    //     console.log(r);
    // });

    //get current contactid value
    // var result = oracle.runSql('SELECT contact_id_seq.currval FROM DUAL');
    // result.then(function (r) {
    //     console.log('This is Current Value: ')
    //     console.log(r);
    //     // for (var i = 0; i < r.rows.length; i++) {
    //     //     console.log(i + ']' + r.rows[i]);
    //     // }
    // });

    //create Query for new employee
    var empQuery =
        'INSERT INTO employee (id, firstname, lastname, dateofbirth, sex, role, managerid, contactid) VALUES (' +
        'employeee_id_seq.nextval ,' +
        '\'' + req.body.firstname + '\',' +
        '\'' + req.body.lastname + '\',' +
        'TO_DATE(\'' + req.body.birth + '\', \'YYYY-MM-DD\') ,' +
        '\'' + req.body.sex + '\',' +
        '\'' + req.body.role + '\',' +
        req.body.managerid + ',' +
        // req.body.contactid +
        ')';

    var loginQuery;
    // 'INSERT INTO Login (EmployeeID, Password, lastlogin) VALUES (1, '5f4dcc3b5aa765d61d8327deb882cf99', TO_DATE('2018-11-02 09:34:33', 'YYYY-MM-DD HH24:MI:SS'));'
    // result = oracle.runSql();
    res.write('<h1>' + conQuery + '</h1><br>');
    res.write('<h1>' + empQuery + '</h1>');
    res.end();
});

module.exports = router