const express = require('express');
const router = express.Router();
const pricelist = require('../control/pricelist');
const latestPricelistController = require('../control/latestpricelist');
const recordPricelistController = require('../control/recordspricelist');


router.get('/latestpricelist', latestPricelistController.getLatestPricelist);
router.post('/pricelist', pricelist);
router.get('/viewrecordpricelist', recordPricelistController.viewRecordPricelist);

// router.get('/latespricelist', getLatestPriceList);


module.exports = router;