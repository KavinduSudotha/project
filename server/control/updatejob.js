const connection = require('../config/DBconnect');

// Function to get all jobs
const getJobs = (req, res) => {
  connection.query(
    'SELECT *, DATE(created_date) AS created_date, DATE(due_date) AS due_date FROM job ORDER BY ABS(DATEDIFF(DATE(due_date), CURDATE())) ASC',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    }
  );
};


// Function to update job status
const updateJobStatus = (req, res) => {
  const { job_id } = req.params;
  const { status } = req.body;
  
  connection.query('UPDATE job SET status = ? WHERE job_id = ?', [status, job_id], (error) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Job status updated successfully' });
  });
};

// Function to delete a job
const deleteJob = (req, res) => {
  const { job_id } = req.params;
  
  connection.query('DELETE FROM job WHERE job_id = ?', [job_id], (error) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  });
};

// Function to update full job details
const updateJobDetails = (req, res) => {
  const { job_id } = req.params;
  const jobDetails = req.body;

  connection.query('UPDATE job SET ? WHERE job_id = ?', [jobDetails, job_id], (error) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Job details updated successfully' });
  });
};

module.exports = {
  getJobs,
  updateJobStatus,
  deleteJob,
  updateJobDetails,
};
