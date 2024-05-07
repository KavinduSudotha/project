const express = require('express');
const router = express.Router();
const login = require('../control/Login');
const test = require('../control/test');
const pricelist = require('../control/pricelist');



router.post('/login', login);
router.post('/test', test);
router.post('/pricelist', pricelist);
 
module.exports = router;