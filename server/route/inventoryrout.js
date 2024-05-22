const express = require('express');
const router = express.Router();
const { getInventorySummary } = require('../control/inventory');
const { getInventoryTable } = require('../control/InventoryTable');

router.get('/Live', getInventorySummary);
router.get('/inventorytable', getInventoryTable);

module.exports = router;
