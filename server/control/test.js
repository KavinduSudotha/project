// test.js

const express = require('express');
const router = express.Router();
const connection = require('../config/DBconnect'); // Assuming you have a db connection file

const test = (req, res) => {
    const { name, role, number } = req.body;

    connection.query('INSERT INTO test (name, role, number) VALUES (?, ?, ?)', [name, role, number], (err, result) => {
        if (err) {  
            console.error('Error querying MySQL database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 1) {
            res.status(201).json({ message: 'Data submitted successfully' });
        } else {
            res.status(500).json({ error: 'Failed to submit data' });
        }
    });
}

module.exports = test;
