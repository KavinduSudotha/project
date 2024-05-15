const connection = require('../config/DBconnect');

const viewRecordPricelist = (req, res) => {
  const query = 'SELECT * FROM weeklypricelist ORDER BY id DESC';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('No records found');
      return;
    }
    res.json(results);
  });
};

module.exports = { viewRecordPricelist };
