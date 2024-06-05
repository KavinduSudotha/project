const db = require('../config/DBconnect');

const shownote = (req, res) => {
  const query = 'SELECT * FROM notes ORDER BY date DESC, time DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching notes:', err);
      res.status(500).json({ error: 'Failed to fetch notes' });
    } else {
      res.json(results);
    }
  });
};

module.exports = { shownote };