var express = require('express');
var router = express.Router();

//home page
router.get('/', require('./home'));

//profile
router.get('/profile', require('./profile'));
router.post('/profile', require('./profile'));

module.exports = router
