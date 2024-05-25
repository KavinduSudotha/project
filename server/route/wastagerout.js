const express = require('express');
const router = express.Router();
const addwastage = require('../control/addwastage');
const { sellWastage,getBatches,getSuggestPrice } = require('../control/sellweste');


router.post('/sellwastage', sellWastage);
router.post('/getBatches', getBatches);
router.post('/getSuggestPrice', getSuggestPrice);

router.post('/addwastage', addwastage.addwastage);

module.exports = router;
