
const db = require('../config/DBconnect');

const fetchdata = (req, res) => {
    const { startDate, endDate, tableName } = req.body;
    const query = `SELECT * FROM ?? WHERE date BETWEEN ? AND ?`;
    db.query(query, [tableName, startDate, endDate], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
};

module.exports = { fetchdata };
