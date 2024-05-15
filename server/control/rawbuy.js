const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../config/DBconnect');

const app = express();
const port = 3001; // Update with your desired port

// Middleware
app.use(bodyParser.json());

// Routes
const priceCal = (req, res) => {
    const { rawType, type, wastageDeduction, density, sandPercentage } = req.body;
  
    let suggestPrice = 0;
  
    if (rawType === 'Coco Chips') {
      // Calculate suggest price for Coco Chips
      // Get price a
      const getPriceQuery = `SELECT chips_${type.replace(/\s+/g, '_').toLowerCase()} AS price FROM weeklypricelist ORDER BY id DESC LIMIT 1`;
      connection.query(getPriceQuery, (err, results) => {
        if (err) throw err;
        const price = results[0].price;
  
        // Get price b
        const getWastageDeductionQuery = `SELECT wastage_deduction_chips_${wastageDeduction} AS deduction FROM weeklypricelist ORDER BY id DESC LIMIT 1`;
        connection.query(getWastageDeductionQuery, (err, results) => {
          if (err) throw err;
          const wastageDeductionPrice = results[0].deduction;
  
          // Calculate suggest price
          suggestPrice = price - wastageDeductionPrice;
          res.json({ suggestPrice });
        });
      });
    } else if (rawType === 'Cocopeat') {
      // Calculate suggest price for Cocopeat
      // Get price c
      const getPriceQuery = `SELECT cocopeat_${type} AS price FROM weeklypricelist ORDER BY id DESC LIMIT 1`;
      connection.query(getPriceQuery, (err, results) => {
        if (err) throw err;
        const price = results[0].price;
  
        // Get price d based on density
        let densityPriceField = '';
        if (density <= 69) {
          densityPriceField = 'density_60_69';
        } else if (density <= 79) {
          densityPriceField = 'density_70_79';
        } else if (density <= 89) {
          densityPriceField = 'density_80_89';
        } else if (density <= 99) {
          densityPriceField = 'density_90_99';
        } else {
          densityPriceField = 'density_100_109';
        }
        const getDensityPriceQuery = `SELECT ${densityPriceField} AS densityPrice FROM weeklypricelist ORDER BY id DESC LIMIT 1`;
        connection.query(getDensityPriceQuery, (err, results) => {
          if (err) throw err;
          const densityPrice = results[0].densityPrice;
  
          // Get price e based on sand percentage
          let sandPriceField = '';
          if (sandPercentage <= 24) {
            sandPriceField = 'sand_20_24';
          } else if (sandPercentage <= 29) {
            sandPriceField = 'sand_25_29';
          } else if (sandPercentage <= 34) {
            sandPriceField = 'sand_30_34';
          } else if (sandPercentage <= 39) {
            sandPriceField = 'sand_35_39';
          } else if (sandPercentage <= 44) {
            sandPriceField = 'sand_40_44';
          } else if (sandPercentage <= 49) {
            sandPriceField = 'sand_45_49';
          } else {
            sandPriceField = 'sand_50_54';
          }
          const getSandPriceQuery = `SELECT ${sandPriceField} AS sandPrice FROM weeklypricelist ORDER BY id DESC LIMIT 1`;
          connection.query(getSandPriceQuery, (err, results) => {
            if (err) throw err;
            const sandPrice = results[0].sandPrice;
  
            // Calculate suggest price
            suggestPrice = price - densityPrice - sandPrice;
            res.json({ suggestPrice });
          });
        });
      });
    }
  };
  
  const buyRecord = (req, res) => {
    const { date, rawType, type, wastageDeduction, density, sandPercentage, suggestPrice, buyPrice, quantity } = req.body;
    const employeeid = 1111; // Assuming you have an employee ID
    const insertQuery = `INSERT INTO buyraw (date, type, employeeid, wastagechip, densitypeat, sandpeat, suggestprice, buyprice, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(insertQuery, [date, type, employeeid, wastageDeduction, density, sandPercentage, suggestPrice, buyPrice, quantity], (err, results) => {
      if (err) throw err;
      console.log('Data Saved Successfully');
      res.sendStatus(200);
    });
  };
  
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });

  module.exports = { priceCal, buyRecord };