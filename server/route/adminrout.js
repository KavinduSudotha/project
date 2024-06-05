const express = require('express');
const router = express.Router();
const { addNote } = require('../control/admin');
const {userInput,status,usertable,userid} = require('../control/users');

// POST route to add a note
router.post('/addnote', addNote);
router.post('/users', userInput)
router.put('/usertable/:userid/status',status)
router.get('/usertable',usertable)
router.put('/usertable/:userid',userid)
module.exports = router;

