const express = require('express');
const router = express.Router();
const cors = require('cors');
const addjob = require('../control/addjob');

const {  getJobs,updateJobStatus, deleteJob,updateJobDetails, } = require('../control/updatejob');


//for hometable
router.get('/jobs', getJobs);
router.put('/updatejobstatus/:job_id', updateJobStatus);
router.delete('/deletejob/:job_id', deleteJob);
router.put('/updatejob/:job_id', updateJobDetails);``




// Backend route for adding a job
router.post('/addjob', addjob);





module.exports = router;







