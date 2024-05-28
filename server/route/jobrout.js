const express = require('express');
const router = express.Router();
const cors = require('cors');
const addjob = require('../control/addjob');

const { getAllJobs, searchJobs, updateJob, deleteJob } = require('../control/updatejob');



// Get all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Search jobs
router.get('/search', async (req, res) => {
  const { searchBy, keyword } = req.query;
  try {
    const jobs = await searchJobs(searchBy, keyword);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Update a job
router.put('/:id', async (req, res) => {
  const jobId = req.params.id;
  const updatedFields = req.body;
  try {
    const result = await updateJob(jobId, updatedFields);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Delete a job
router.delete('/:id', async (req, res) => {
  const jobId = req.params.id;
  try {
    const result = await deleteJob(jobId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Backend route for adding a job
router.post('/addjob', addjob);





module.exports = router;







