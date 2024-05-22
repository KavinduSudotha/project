const connection = require('../config/DBconnect');
const { get } = require('./pricelist');


  const getInventoryTable = (req, res) => {
  const query = 'SELECT * FROM inventory';

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {getInventoryTable};