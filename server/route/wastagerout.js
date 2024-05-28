const express = require('express');
const router = express.Router();
const addwastage = require('../control/addwastage');
const getwastage = require('../control/getwastage');
const { sellWastage,getBatches,getSuggestPrice,sellWastagetable } = require('../control/sellweste');


router.post('/sellwastage', sellWastage);
router.post('/getBatches', getBatches);
router.post('/getSuggestPrice', getSuggestPrice);
router.get('/getwastage', getwastage);   
router.post('/addwastage', addwastage.addwastage);
router.get('/sellwastagetable',sellWastagetable);

module.exports = router;
