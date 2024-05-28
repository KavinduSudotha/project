
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('../config/DBconnect');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const addjob =(req, res) => {
  const {
    createdDate,
    dueDate,
    customerName,
    address,
    employeeId,
    chip_type,
    peat_type,
    height,
    width,
    length,
    ratioChips,
    ratioPeat,
    weight,
    quantity,
    driverName,
    sheet_per_pallet,
    container_size, 
    pallets_per_container, 
    vehicleNumber,
    transportCompany,
    note,
    status,
  } = req.body;

  const query = `
    INSERT INTO job 
    (created_date, due_date, customer_name, address, employee_id,chip_type,peat_type, height, width, length, ratio_chips, ratio_peat, weight, quantity,sheet_per_pallet,container_size, pallets_per_container,  driver_name, vehicle_number, transport_company, note, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)
  `;

  connection.query(query, [
    createdDate,
    dueDate,
    customerName,
    address,
    employeeId,
    chip_type,
    peat_type,
    height,
    width,
    length,
    ratioChips,
    ratioPeat,
    weight,
    quantity,
    sheet_per_pallet,
    container_size  , 
    pallets_per_container, 
    driverName,
    vehicleNumber,
    transportCompany,
    note,
    status,
  ], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send('Job added successfully');
  });
};

module.exports = addjob;