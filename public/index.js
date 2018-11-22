var express = require('express');
var router = express.Router();

router.get('/', require('./home'));
router.post('/profile', require('./profile'));
module.exports = router