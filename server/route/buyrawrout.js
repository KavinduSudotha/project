const express = require('express');
const router = express.Router();
const { priceCal, buyRecord } = require('../control/rawbuy');
const Rawbuytable = require('../control/buyrawtable');

router.post('/pricecal', priceCal);
router.post('/buyrecord', buyRecord);
router.get('/buyrawtable', Rawbuytable);

module.exports = router;
