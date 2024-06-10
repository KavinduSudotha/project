const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addNote, getnote, updateNote, deleteNote } = require('../control/admin');
const { userInput, status, usertable, userid } = require('../control/users');
const { fetchdata } = require('../control/Report');

// Define routes
router.post('/fetchdata', fetchdata);
router.delete('/deletenotes/:id', deleteNote);
router.get('/getnotes', getnote);
router.put('/updatenotes/:id', updateNote);
router.post('/addnote', addNote);
router.post('/users', userInput);
router.put('/usertable/:userid/status', status);
router.get('/usertable', usertable);
router.put('/usertable/:userid', userid);




module.exports = router;

