// authRouteTest.js

const express = require('express');
const router = express.Router();
const connection = require('../config/DBconnect'); // Assuming you have a dbconnect.js file for database connection

// Endpoint to handle storing weekly price list data
router.post('/pricelist', (req, res) => {
  const {
    date,
    chips_11mm_unwashed,
    chips_11mm_washed,
    chips_9mm_unwashed,
    chips_9mm_washed,
    chips_7mm_unwashed,
    chips_7mm_washed,
    cocopeat_hi_ec,
    cocopeat_low_ec,
    wastage_deduction_chips,
    density,
    sand,
    wastage_price,
    employee_id // Assuming you also pass the employee ID
  } = req.body;

  const sql = `INSERT INTO weeklypricelist 
    (date, chips_11mm_unwashed, chips_11mm_washed, chips_9mm_unwashed, chips_9mm_washed, 
    chips_7mm_unwashed, chips_7mm_washed, cocopeat_hi_ec, cocopeat_low_ec, 
    wastage_deduction_chips_8, wastage_deduction_chips_9, wastage_deduction_chips_10, wastage_deduction_chips_11, wastage_deduction_chips_12, wastage_deduction_chips_13, wastage_deduction_chips_14, wastage_deduction_chips_15, wastage_deduction_chips_16, wastage_deduction_chips_17, wastage_deduction_chips_18, wastage_deduction_chips_19, wastage_deduction_chips_20, 
    density_60_69, density_70_79, density_80_89, density_90_99, density_100_109,
    sand_20_24, sand_25_29,  sand_30_34, sand_35_39, sand_40_44, sand_45_49, sand_50_54, 
    wastage_price_cocopeat_fiber, wastage_price_cocopeat_fine_dust, wastage_price_10c_sieved, wastage_price_10c_not_sieved, wastage_price_10c_upper_part,
    employee_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    date,
    chips_11mm_unwashed,
    chips_11mm_washed,
    chips_9mm_unwashed,
    chips_9mm_washed,
    chips_7mm_unwashed,
    chips_7mm_washed,
    cocopeat_hi_ec,
    cocopeat_low_ec,
    ...wastage_deduction_chips,
    ...density,
    ...sand,
    ...wastage_price,
    employee_id
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Data inserted successfully:', result);
    res.sendStatus(200); // Send success response
  });
});

module.exports = router;
