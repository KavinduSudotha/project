const connection = require('../config/DBconnect');

const getwastage = (req, res) => {
  // Perform database query to fetch wastage data
  connection.query('SELECT * FROM addwastage', (error, results, fields) => {
    if (error) {
      console.error('Error fetching wastage data:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    // Send response with the retrieved data
    res.json(results);
  });
};

module.exports = getwastage;
