const express = require('express');
const router = express.Router();
const pricelist = require('../control/pricelist');



router.post('/pricelist', pricelist);


module.exports = router;