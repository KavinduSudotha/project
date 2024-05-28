const connection = require('../config/DBconnect');
const cron = require('node-cron');

const getInventorySummary = (req, res) => {
    const capacity = 10000;
    const rawQuery = 'SELECT type, SUM(availablequantity) as total_weight FROM summarytable GROUP BY type';
    const wastageQuery = 'SELECT type, SUM(available_quantity) as total_weight FROM summarytablewastage GROUP BY type';

    connection.query(rawQuery, (err, rawResults) => {
        if (err) {
            console.error('Error fetching raw inventory summary:', err);
            return res.status(500).json({ error: 'Error fetching raw inventory summary' });
        }

        connection.query(wastageQuery, (err, wastageResults) => {
            if (err) {
                console.error('Error fetching wastage inventory summary:', err);
                return res.status(500).json({ error: 'Error fetching wastage inventory get summary' });
            }

            const summary = rawResults.map(row => ({
                type: row.type,
                total_weight: row.total_weight
            }));

            const wastageSummary = wastageResults.map(row => ({
                type: row.type,
                total_weight: row.total_weight
            }));

            const totalWeightRaw = summary.reduce((acc, item) => acc + item.total_weight, 0);
            const totalWeightWastage = wastageSummary.reduce((acc, item) => acc + item.total_weight, 0);
            const totalWeight = totalWeightRaw + totalWeightWastage;
            const freeSpace = capacity - totalWeight;

            res.json({
                summary: [...summary, ...wastageSummary],
                totalWeightRaw,
                totalWeightWastage,
                totalWeight,
                freeSpace
            });
        });
    });
};

// Function to insert inventory data into the database
const insertInventoryData = () => {
    const capacity = 10000;
    const rawQuery = 'SELECT type, SUM(availablequantity) as total_weight FROM summarytable GROUP BY type';
    const wastageQuery = 'SELECT type, SUM(available_quantity) as total_weight FROM summarytablewastage GROUP BY type';

    connection.query(rawQuery, (err, rawResults) => {
        if (err) {
            console.error('Error fetching raw inventory summary:', err);
            return;
        }

        connection.query(wastageQuery, (err, wastageResults) => {
            if (err) {
                console.error('Error fetching wastage inventory summary:', err);
                return;
            }

            const summary = rawResults.map(row => ({
                type: row.type,
                total_weight: row.total_weight
            }));

            const wastageSummary = wastageResults.map(row => ({
                type: row.type,
                total_weight: row.total_weight
            }));

            const totalWeightRaw = summary.reduce((acc, item) => acc + item.total_weight, 0);
            const totalWeightWastage = wastageSummary.reduce((acc, item) => acc + item.total_weight, 0);
            const totalWeight = totalWeightRaw + totalWeightWastage;
            const freeSpace = capacity - totalWeight;

            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0];

            const insertQuery = `INSERT INTO inventory (
                date, time, total_weight_chips_11mm_unwashed, total_weight_chips_11mm_washed, 
                total_weight_chips_9mm_unwashed, total_weight_chips_9mm_washed, 
                total_weight_chips_7mm_unwashed, total_weight_chips_7mm_washed, 
                total_weight_cocopeat_hi_ec, total_weight_cocopeat_low_ec, 
                wastage_price_cocopeat_fiber, wastage_price_cocopeat_fine_dust, 
                wastage_price_10c_sieved, wastage_price_10c_not_sieved, 
                wastage_price_10c_upper_part, total_weight_raw, 
                total_weight_wastage, total_weight, free_space) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
                wastageSummary.find(item => item.type === 'wastage_price_cocopeat_fiber')?.total_weight || 0,
                wastageSummary.find(item => item.type === 'wastage_price_cocopeat_fine_dust')?.total_weight || 0,
                wastageSummary.find(item => item.type === 'wastage_price_10c_sieved')?.total_weight || 0,
                wastageSummary.find(item => item.type === 'wastage_price_10c_not_sieved')?.total_weight || 0,
                wastageSummary.find(item => item.type === 'wastage_price_10c_upper_part')?.total_weight || 0,
                totalWeightRaw,
                totalWeightWastage,
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
    });
};


// // Schedule the task to run every 5 seconds
//cron.schedule('*/5 * * * * *', insertInventoryData);


// Schedule the task to run every 8 hours
cron.schedule('0 */8 * * *', insertInventoryData);

module.exports = { getInventorySummary };
