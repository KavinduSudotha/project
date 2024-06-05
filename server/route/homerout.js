const express = require('express');
const router = express.Router();
const { shownote } = require('../control/home');

router.get('/shownote', shownote);


module.exports = router;
