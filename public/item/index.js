var express = require('express');
var router = express.Router();

//required for post?
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
// router.use(express.json());
// router.use(express.urlencoded());

router.get('/item', function (req, res) {
    res.sendFile('item.html', { root: __dirname })
});