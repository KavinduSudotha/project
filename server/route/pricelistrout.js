const express = require('express');
const router = express.Router();
const pricelist = require('../control/pricelist');
const latestPricelistController = require('../control/latestpricelist');
const recordPricelistController = require('../control/recordspricelist');
const {priceCal, buyRecord} = require('../control/rawbuy')

router.get('/latestpricelist', latestPricelistController.getLatestPricelist);
router.post('/pricelist', pricelist);
router.get('/viewrecordpricelist', recordPricelistController.viewRecordPricelist);
router.post('/pricecal', priceCal);
router.post('/buyrecord', buyRecord);
// router.get('/latespricelist', getLatestPriceList);


module.exports = router;