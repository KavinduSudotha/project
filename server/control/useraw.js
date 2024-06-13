const connection = require('../config/DBconnect');

// Get the next use_id
exports.getUseId = (req, res) => {
    connection.query('SELECT MAX(use_id) AS lastId FROM use_raw', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        const nextId = results[0].lastId + 1;
        res.json({ useId: nextId });
    });
};

// Get job options with customer name
exports.getJobOptions = (req, res) => {
    connection.query('SELECT job_id, customer_name FROM job', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
};

// Get chip_type and peat_type based on job_id
exports.getJobDetails = (req, res) => {
  const { jobId } = req.body;
  connection.query('SELECT chip_type, peat_type FROM job WHERE job_id = ?', [jobId], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err });
      }
      res.json(results[0]);
  });
};


// Get batch options based on type
exports.getBatchOptions = (req, res) => {
    const { type } = req.body;
    console.log(type);
    connection.query('SELECT buy_id, availablequantity FROM summarytable WHERE type = ?', [type], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
        console.log(results);
    });
};

// Calculate predicted quantity
exports.getPredictedQuantity = (req, res) => {
    const { type, jobId } = req.body;

    connection.query('SELECT * FROM buyraw WHERE type = ?', [type], (err, buyrawResults) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        connection.query('SELECT * FROM job WHERE job_id = ?', [jobId], (err, jobResults) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            const job = jobResults[0];
            const buyraw = buyrawResults[0];
            const n = job.quantity * job.weight;

            let predictedQuantity = 0;
            if (type.includes('chips')) {
                const w = buyraw.wastagechip;
                const c = job.ratio_chips;
                const p = job.ratio_peat;
                predictedQuantity = n * (100 / (100 - w)) * (c / (c + p));
            } else {
                const s = buyraw.sandpeat;
                const c = job.ratio_chips;
                const p = job.ratio_peat;
                predictedQuantity = n * (100 / (100 - s)) * (p / (c + p));
            }

            res.json({ predictedQuantity });
        });
    });
};

// Get releasable weight
exports.getReleasableWeight = (req, res) => {
    const { buy_id } = req.body;
    console.log(buy_id);
    
    connection.query('SELECT availablequantity FROM summarytable WHERE buy_id = ?', [buy_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: "No data found for the given buy_id" });
        }
        
        res.json({ releasableWeight: results[0].availablequantity });
    });
};


// Calculate predicted wastage
exports.getPredictedWastage = (req, res) => {
    const { q, type } = req.body;
    connection.query('SELECT wastagechip FROM buyraw WHERE type = ?', [type], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        const w = results[0].wastagechip;
        const predictedWastage = q * (w / 100);
        res.json({ predictedWastage });
    });
};

// Calculate predicted sand
exports.getPredictedSand = (req, res) => {
    const { q, type } = req.body;
    connection.query('SELECT sandpeat FROM buyraw WHERE type = ?', [type], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        const s = results[0].sandpeat;
        const predictedSand = q * (s / 100);
        res.json({ predictedSand });
    });
};

// Submit form data
exports.submit = (req, res) => {
  const { date, jobId, type, releasedWeight, batchId,Userid } = req.body;

  // Start a transaction
  connection.beginTransaction((err) => {
      if (err) {
          return res.status(500).json({ error: err });
      }

      // Insert into use_raw table
      connection.query(
          'INSERT INTO use_raw (date, job_id, type, released_weight, batch_id, employee_id) VALUES (?, ?, ?, ?, ?, ?)',
          [date, jobId, type, releasedWeight, batchId,Userid],
          (err, results) => {
              if (err) {
                  return connection.rollback(() => {
                      res.status(500).json({ error: err });
                  });
              }

              // Retrieve available quantity from summary table
              connection.query(
                  'SELECT availablequantity FROM summarytable WHERE buy_id = ?',
                  [batchId],
                  (err, results) => {
                      if (err) {
                          return connection.rollback(() => {
                              res.status(500).json({ error: err });
                          });
                      }

                      if (results.length === 0) {
                          return connection.rollback(() => {
                              res.status(404).json({ error: 'Batch ID not found' });
                          });
                      }

                      const availableQuantity = results[0].availablequantity;
                      const newAvailableQuantity = availableQuantity - releasedWeight;

                      if (newAvailableQuantity < 0) {
                          return connection.rollback(() => {
                              res.status(400).json({ error: 'Released weight exceeds available quantity' });
                          });
                      }

                      // Update or delete the record in the summary table
                      const updateOrDeleteQuery = newAvailableQuantity < 5
                          ? 'DELETE FROM summarytable WHERE buy_id = ?'
                          : 'UPDATE summarytable SET availablequantity = ? WHERE buy_id = ?';

                      const queryValues = newAvailableQuantity < 5
                          ? [batchId]
                          : [newAvailableQuantity, batchId];

                      connection.query(updateOrDeleteQuery, queryValues, (err, results) => {
                          if (err) {
                              return connection.rollback(() => {
                                  res.status(500).json({ error: err });
                              });
                          }

                          // Commit the transaction
                          connection.commit((err) => {
                              if (err) {
                                  return connection.rollback(() => {
                                      res.status(500).json({ error: err });
                                  });
                              }
                              res.json({ message: 'Data submitted successfully' });
                          });
                      });
                  }
              );
          }
      );
  });
};
