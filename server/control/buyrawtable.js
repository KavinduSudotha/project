const db = require('../config/DBconnect');

const Rawbuytable = (req, res) => {
  const sql = 'SELECT buyid, DATE_FORMAT(date, "%Y-%m-%d") as date, type, employeeid, wastagechip, densitypeat, sandpeat, suggestprice, buyprice, quantity FROM buyraw ORDER BY buyid DESC';
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
