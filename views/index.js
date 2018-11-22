var express = require('express');
var router = express.Router();

router.get('/', require('./home'));

router.get('/profile', require('./profile'));
router.post('/profile', require('./profile'));

module.exports = router