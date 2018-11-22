var express = require('express');
var router = express.Router();

router.get('/', require('./home'));

module.exports = router