const db = require('../config/DBconnect');

const Rawbuytable = (req, res) => {
  const sql = 'SELECT * FROM buyraw';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching buy raw data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};

module.exports = Rawbuytable;
