const express = require('express');
const router = express.Router();
const login = require('../control/Login');

router.post('/', login);
 
module.exports = router;