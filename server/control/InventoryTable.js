const connection = require('../config/DBconnect');

const getInventoryTableData = (req, res) => {
    connection.query('SELECT * FROM inventory', (err, results) => {
        if (err) {
            console.error('Error fetching inventory table data:', err);
            return res.status(500).json({ error: 'Error fetching inventory table data' });
        }

        res.json(results);
    });
};

module.exports = { getInventoryTableData };
