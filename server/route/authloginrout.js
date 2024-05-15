const express = require('express');
const router = express.Router();
const login = require('../control/Login');
const test = require('../control/test');




router.post('/login', login);
router.post('/test', test);
 
module.exports = router;