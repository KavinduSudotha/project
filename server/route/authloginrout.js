const express = require('express');
const router = express.Router();
const login = require('../control/Login');


router.post('/login', login);

 
module.exports = router;