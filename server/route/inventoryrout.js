const express = require('express');
const router = express.Router();
const { getInventorySummary } = require('../control/inventory');
const { getInventoryTableData } = require('../control/InventoryTable');

router.get('/Live', getInventorySummary);
router.get('/inventorytable', getInventoryTableData);

module.exports = router;
