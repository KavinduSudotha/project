const connection = require('../config/DBconnect');

const cron = require('node-cron');

const getInventorySummary = (req, res) => {
    const capacity = 10000;
    connection.query('SELECT type, SUM(availablequantity) as total_weight FROM summarytable GROUP BY type', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        const summary = results.map(row => ({
            type: row.type,
            total_weight: row.total_weight
        }));

        const totalWeight = summary.reduce((acc, item) => acc + item.total_weight, 0);
        const freeSpace = capacity - totalWeight;

        res.json({
            summary,
            totalWeight,
            freeSpace
        });
    });
};

// Function to insert inventory data into the database
const insertInventoryData = () => {
    const capacity = 10000;
    connection.query('SELECT type, SUM(availablequantity) as total_weight FROM summarytable GROUP BY type', (err, results) => {
        if (err) {
            console.error('Error fetching inventory summary:', err);
            return;
        }

        const summary = results.map(row => ({
            type: row.type,
            total_weight: row.total_weight
        }));

        const totalWeight = summary.reduce((acc, item) => acc + item.total_weight, 0);
        const freeSpace = capacity - totalWeight;

        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0];

        const insertQuery = `INSERT INTO inventory (date, time, total_weight_chips_11mm_unwashed, total_weight_chips_11mm_washed, total_weight_chips_9mm_unwashed, total_weight_chips_9mm_washed, total_weight_chips_7mm_unwashed, total_weight_chips_7mm_washed, total_weight_cocopeat_hi_ec, total_weight_cocopeat_low_ec, total_weight, free_space) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            date, time,
            summary.find(item => item.type === 'chips_11mm_unwashed')?.total_weight || 0,
            summary.find(item => item.type === 'chips_11mm_washed')?.total_weight || 0,
            summary.find(item => item.type === 'chips_9mm_unwashed')?.total_weight || 0,
            summary.find(item => item.type === 'chips_9mm_washed')?.total_weight || 0,
            summary.find(item => item.type === 'chips_7mm_unwashed')?.total_weight || 0,
            summary.find(item => item.type === 'chips_7mm_washed')?.total_weight || 0,
            summary.find(item => item.type === 'cocopeat_hi_ec')?.total_weight || 0,
            summary.find(item => item.type === 'cocopeat_low_ec')?.total_weight || 0,
            totalWeight,
            freeSpace
        ];

        connection.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting into inventory table:', err);
            } else {
                console.log('Inventory data inserted successfully.');
            }
        });
    });
};

// Schedule the task to run every 8 hours
// cron.schedule('*/5 * * * * *', insertInventoryData);
cron.schedule('0 */8 * * *', insertInventoryData);


module.exports = { getInventorySummary };