// backend/control/linechart.js

const connection = require('../config/DBconnect');
const { format, parseISO, startOfWeek, addWeeks, startOfMonth, addMonths, startOfYear, addYears } = require('date-fns');

const Linechart = async (req, res) => {
    const { interval } = req.query;

    let query = '';
    let groupBy = '';
    let selectTime = '';

    switch (interval) {
        case 'daily':
            groupBy = 'DATE(date)';
            selectTime = 'DATE(date) AS time';
            break;
        case 'weekly':
            groupBy = 'YEARWEEK(date, 1)';
            selectTime = 'MIN(date) + INTERVAL 3 DAY AS time';
            break;
        case 'monthly':
            groupBy = 'DATE_FORMAT(date, "%Y-%m")';
            selectTime = 'DATE_FORMAT(DATE_SUB(LAST_DAY(date), INTERVAL 15 DAY), "%Y-%m-%d") AS time';
            break;
        case 'yearly':
            groupBy = 'YEAR(date)';
            selectTime = 'DATE_FORMAT(DATE_SUB(DATE_ADD(MAKEDATE(YEAR(date), 1), INTERVAL 6 MONTH), INTERVAL 15 DAY), "%Y-%m-%d") AS time';
            break;
        default:
            groupBy = 'DATE(date)';
            selectTime = 'DATE(date) AS time';
    }

    query = `
        SELECT 
            ${selectTime}, 
            AVG(total_weight_raw) AS total_weight_raw, 
            AVG(total_weight_wastage) AS total_weight_wastage, 
            AVG(total_weight) AS total_weight, 
            AVG(free_space) AS free_space 
        FROM inventory 
        GROUP BY ${groupBy} 
        ORDER BY time ASC
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json(results);
    });
};

module.exports = { Linechart };
