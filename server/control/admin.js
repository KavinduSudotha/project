// controllers/notes.js

const db = require('../config/DBconnect');

// Function to add a note
const addNote = async (req, res) => {
  const { note } = req.body;
  const employee_id = 111; // Hardcoded for now, will be replaced with token logic

  // Get current date and time
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toISOString().slice(11, 19);

  // SQL query to insert a new note
  const sql = 'INSERT INTO notes (Date, Time, note, employee_id) VALUES (?, ?, ?, ?)';
  const values = [currentDate, currentTime, note, employee_id];

  try {
    // Execute the query
    await db.query(sql, values);
    res.status(201).json({ message: 'Note added successfully' });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addNote };
