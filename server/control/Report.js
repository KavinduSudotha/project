const db = require('../config/DBconnect');

const fetchdata = (req, res) => {
    const { startDate, endDate, tableName } = req.body;
    let query;
    let queryParams;

    if (tableName === 'job') {
        // For the 'job' table, filter by due_date
        query = `SELECT * FROM ?? WHERE due_date BETWEEN ? AND ?`;
        queryParams = [tableName, startDate, endDate];
    } else if (tableName === 'user') {
        // For the 'user' table, select all data excluding the password column
        query = `SELECT userid, username, role, firstname, lastname, address, email, mobilenumber, status, admin_id FROM ??`;
        queryParams = [tableName];
    } else {
        // For other tables, filter by date
        query = `SELECT * FROM ?? WHERE date BETWEEN ? AND ?`;
        queryParams = [tableName, startDate, endDate];
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
};

module.exports = { fetchdata };
