const express = require('express');
const router = express.Router();
const userawController = require('../control/useraw');
const { getAllRecords } = require('../control/allrecorduseraw');



router.get('/getAllRecords', getAllRecords);
router.get('/getUseId', userawController.getUseId);
router.get('/getJobOptions', userawController.getJobOptions);
router.post('/getBatchOptions', userawController.getBatchOptions);
router.post('/getPredictedQuantity', userawController.getPredictedQuantity);
router.post('/getReleasableWeight', userawController.getReleasableWeight);
router.post('/getPredictedWastage', userawController.getPredictedWastage);
router.post('/getPredictedSand', userawController.getPredictedSand);
router.post('/submit', userawController.submit);
router.post('/getJobDetails', userawController.getJobDetails);


module.exports = router;
