const express = require('express');
const bcrypt = require('bcryptjs');
// const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('../config/DBconnect');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const cors = require('cors');



const usertable = (req, res) => {
    const query = 'SELECT userid, username, role, firstname, address, email, mobilenumber, status, admin_id FROM user';
    connection.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  };

const status=  (req, res) => {
  const { userid } = req.params;
  const { status } = req.body;
  const query = 'UPDATE user SET status = ? WHERE userid = ?';
  connection.query(query, [status, userid], (error) => {
    if (error) return res.status(500).send(error);
    res.send('Status updated successfully.');
  });
};

const userid = (req, res) => {
  const { userid } = req.params;
  const { username, role, firstname, address, email, mobilenumber } = req.body;
  const query = 'UPDATE user SET username = ?, role = ?, firstname = ?, address = ?, email = ?, mobilenumber = ? WHERE userid = ?';
  connection.query(query, [username, role, firstname, address, email, mobilenumber, userid], (error) => {
    if (error) return res.status(500).send(error);
    res.send('User updated successfully.');
  });
};



// Helper function to get the next user id
const getNextUserId = async () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT MAX(userid) AS maxUserId FROM user', (err, results) => {
      if (err) reject(err);
      resolve(results[0].maxUserId + 1);
    });
  });
};


const userInput = async (req, res) => {
  try {
    const {
      username, password, role, firstName,
      lastName, address, email, mobileNumber, status, admin_id
    } = req.body;

    const userid = await getNextUserId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO user (userid, username, password, role, firstname, lastname, address, email, mobilenumber, status, admin_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      userid, username, hashedPassword, role, firstName, lastName,
      address, email, mobileNumber, status, admin_id
    ];

    connection.query(query, values, (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: 'User added successfully!' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {userInput,userid,status,usertable};
