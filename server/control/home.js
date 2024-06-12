const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/DBconnect');

const shownote = (req, res) => {
  const query = 'SELECT * FROM notes ORDER BY date DESC, time DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching notes:', err);
      res.status(500).json({ error: 'Failed to fetch notes' });
    } else {
      res.json(results);
    }
  });
};



const Userprofile = async (req, res) => {
  const userId = req.params.userId;
  console.log('userId:', userId);
  const sql = 'SELECT * FROM user WHERE userid = ?';

  try {
    const result = await db.query(sql, [userId]);

    if (result.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(result[0]);
  } catch (err) {
    console.error('Error executing MySQL query:', err);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

const changePassword = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    // Fetch the user's current password from the database
    const rows = await db.query('SELECT password FROM user WHERE userid = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = rows[0].password;

    // Compare the provided current password with the stored hashed password
    const match = await bcrypt.compare(currentPassword, hashedPassword);

    if (!match) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await db.query('UPDATE user SET password = ? WHERE userid = ?', [newHashedPassword, userId]);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ error: 'Failed to update password' });
  }
};

module.exports = { shownote, Userprofile, changePassword };
