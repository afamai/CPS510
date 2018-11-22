var express = require('express');
var router = express.Router();
var oracle = require('../../server/service/oracle');

//required for post?
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
// router.use(express.json());
// router.use(express.urlencoded());

router.post('/profile', function(req, res) {
    result = oracle.runSql('select * from login');
    result.then(function(r){
        for (var i = 0; i < r.rows.length; i++) {
            console.log(i + ']' + r.rows[i]);
        }
    });
    
    res.write('hello');
    // res.write(req.body.user + req.body.pass);
    res.end();
});

module.exports = router