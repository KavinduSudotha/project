const express = require('express');
const router = express.Router();
const { shownote,Userprofile,changePassword } = require('../control/home');

router.get('/shownote', shownote);
router.get('/userprofile/:userId', Userprofile);
router.post('/userprofile/:userId/change-password', changePassword);


module.exports = router;
