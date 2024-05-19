// services/jobService.js
const connection = require('../config/DBconnect');

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

module.exports = { getAllJobs, searchJobs, updateJob, deleteJob };
