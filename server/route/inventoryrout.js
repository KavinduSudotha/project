const express = require('express');
const router = express.Router();
const { getInventorySummary,homechart } = require('../control/inventory');
const { getInventoryTableData } = require('../control/InventoryTable');
const { Linechart } = require('../control/linechart');

router.get('/linechart', Linechart);
router.get('/Live', getInventorySummary);
router.get('/inventorytable', getInventoryTableData);
router.get('/homechart', homechart);

module.exports = router;
