// services/jobService.js
const connection = require('../config/DBconnect');
const { format } = require('date-fns');

const getJobs = async (req, res) => {
    const query = `
        SELECT 
            job_id, 
            DATE_FORMAT(due_date, '%Y-%m-%d') as due_date, 
            chip_type, 
            peat_type, 
            address, 
            status,
            note 
        FROM job
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
};

async function getAllJobs() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM job', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function searchJobs(searchBy, keyword) {
  let query;
  if (searchBy === 'job_id') {
    query = 'SELECT * FROM job WHERE job_id = ?';
  } else if (searchBy === 'status') {
    query = 'SELECT * FROM job WHERE status = ?';
  }

  return new Promise((resolve, reject) => {
    connection.query(query, [keyword], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function updateJob(jobId, updatedFields) {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE job SET ? WHERE job_id = ?', [updatedFields, jobId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function deleteJob(jobId) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM job WHERE job_id = ?', [jobId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}





module.exports = { getAllJobs, searchJobs, updateJob, deleteJob,getJobs };
