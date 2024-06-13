const connection = require('../config/DBconnect');

const getAllRecords = (req, res) => {
  const sql = 'SELECT * FROM use_raw ORDER BY date DESC';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching useraw data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};

module.exports = {
  getAllRecords
};
